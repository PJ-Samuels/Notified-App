const express = require('express');
const cors = require('cors');
const request = require('request');
const querystring = require('querystring')
const bodyParser = require('body-parser');
const app = express();
const config = require('./config.js');
const pool = require('./db.js');
var client_id = config.CLIENT_ID;
var client_secret = config.CLIENT_SECRET;
var redirect_uri = 'http://localhost:3000/callback';
const session = require('express-session');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
var validator = require("email-validator");
const bcrypt = require("bcrypt")

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.use(cors());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.json());
app.use(bodyParser.json())

app.get('/', (req, res) => {
    const data = ["This is the server"];
    res.json(data);
  });
app.post('/',async (req,res) =>{
  var user_id;
  if (validator.validate(req.body.email)) {
    console.log("Valid email");
    const password = req.body.password;
    pool.query('SELECT email, password FROM "Users" WHERE email = $1', [req.body.email])
      .then(result => {
        if (result.rowCount > 0) {
          const hashedPassword = result.rows[0].password;
          bcrypt.compare(password, hashedPassword, (err, isValid) => {
            if (isValid) {
              pool.query('SELECT id FROM "Users" WHERE email = $1', [req.body.email])
                .then(result2 => {
                  user_id = result2.rows[0].id;
                  res.json([1, user_id]);
                })
                .catch(error => {
                  console.error(error);
                  res.json([0, null]);
                });
            } else {
              throw new Error('Invalid credentials');
            }
          });
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .catch(error => {
        console.error(error);
        res.json([0, null]);
      });
  } else {
    console.log("Invalid email");
    res.json([0, null]);
  }
});

app.post('/signup', (req, res) => {
  var user_id;
  const account = req.body.account;
  console.log(account.email)
  if (validator.validate(account.email)) {
    console.log("Valid email");
    const password = account.password;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        res.redirect('/signup');
      } else {
        pool.query('INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3)', [account.username, account.email, hash], (err, result) => {
          if (err) {
            console.error(err);
            res.redirect('/signup');
          } else {
            console.log("Success");
            pool.query('SELECT id FROM "Users" WHERE username = $1 AND email = $2 AND password = $3', [account.username, account.email, hash], (err, result) => {
              if (err) {
                console.error(err);
                res.redirect('/signup');
              } else {
                user_id = result.rows[0].id;
                req.session.user_id = user_id;
                res.redirect('/login?user_id=' + user_id);
              }
            });
          }
        });
      }
    });
  } else {
    console.log("Invalid email");
    res.redirect('/signup');
  }
});

function generateUniqueIdentifier(req, state, user_id) {
  const query = 'INSERT INTO unique_identifiers (user_state, user_id) VALUES ($1, $2)';
  pool.query(query, [state, user_id])
    .then(result => {
    })
  return state;
}

app.get('/login', function(req, res) {
  req.session.user_id = req.query.user_id;
  const user_id = req.query.user_id;  
  var state = generateRandomString(16);
  const uniqueIdentifier = generateUniqueIdentifier(req, state, user_id);
  var scope = 'user-read-private user-read-email';
  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  })
  spotifyAuthUrl = 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString();
  res.send(spotifyAuthUrl);
});
  
app.get('/callback', function(req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var user_id;
  const query = 'SELECT user_id FROM unique_identifiers WHERE user_state = $1';
  pool.query(query, [state])
  .then(result => {
    if (result.rows.length > 0) {
      user_id = result.rows[0].user_id;
      req.session.user_id = user_id;
      const deleteQuery = 'DELETE FROM unique_identifiers WHERE user_state = $1';
      pool.query(deleteQuery, [state])
        .then(() => {
          // console.log("deleted")
        })
        .catch(error => {
        });
      }
  })
  if (state === null) {
    res.redirect('/callback' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send(`http://localhost:3000/user_dashboard?accesstoken=${access_token}&user_id=${user_id}`);
      }
    });
  }

});

app.get('/user_dashboard', (req, res) => {
  const user_id = req.query.user_id;
  const subscribed_artist = pool.query('SELECT * FROM "Subscribed_Artists" WHERE user_id = $1', [user_id], (err, result) => {
    res.json(result.rows);

  });
});
app.get('/add_artist', (req, res) => {
  const artist_name = req.query.artist_name;
  const user_id = req.query.user_id;
  pool.query('SELECT * FROM "Subscribed_Artists" WHERE user_id = $1 AND artist_name = $2', [user_id, artist_name], (err, result) => {
    if (result.rowCount > 0) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});
app.post('/artist_subscription', (req, res) => {
  const newArtist = req.body.artist_info;
  const subscribe_status = req.body.subscribe_status;
  const user_id = req.body.user_id;
  if (subscribe_status === false) {
    const newArtistQuery  =  pool.query(`INSERT INTO "Subscribed_Artists" (user_id, artist_id, artist_name, artist_img, latest_release) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user_id, newArtist.artist_id, newArtist.artist_name, newArtist.artist_image, newArtist.latest_release, ], (err, result) => {
      res.json((true))
    });
  }
  else {
    const newArtistQuery  =  pool.query(`DELETE FROM "Subscribed_Artists" WHERE artist_id = $1 AND user_id = $2`, [newArtist.artist_id, user_id], (err, result) => {
      res.json((false))
    });
  }
});

app.get('/notification', (req, res) => {
  const user_id = req.query.user_id;
  const subscribed_artist = pool.query('SELECT * FROM "Subscribed_Artists" WHERE user_id = $1', [user_id], (err, result) => {
  });
});

function sendEmail(bool){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pjsamuels3@gmail.com',
      pass: config.GMAIL_PASSWORD,
    },
  });
  if (bool === true) {
    console.log("send email to user")
    const mailOptions = {
      from: 'pjsamuels3@gmail.com',
      to: 'osamuels@bu.edu',
      subject: 'Test Email',
      text: 'This is a test email sent from Nodemaile for new releases.',
    };
    transporter.sendMail(mailOptions, (error, info) => {
      // console.log('Email sent: ' + info.response);
      res.send('Email sent successfully.');
    });  
  }
}


const timeZone = 'America/New_York';
const cronSchedule = `${moment().tz(timeZone).startOf('hour').format('m')} * * * *`;
cron.schedule(cronSchedule, () => {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    const currentHour = moment().format('HH:mm');
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      pool.query(('SELECT artist_id, MAX(latest_release) AS latest_release FROM "Subscribed_Artists" GROUP BY artist_id'), (err, result) => {
        const subscribedArtists = result.rows;
        for (let j = 0; j < subscribedArtists.length; j++) {
          const artist_id = subscribedArtists[j].artist_id;
          fetch(`https://api.spotify.com/v1/artists/${artist_id}/albums?limit=1`, {
            method: "GET",
            headers: {
              'Authorization': 'Bearer ' + token,
            }
          })
          .then(response => response.json())
          .then(data => {
            var latest_release = data.items[0].name;
            var release_img = data.items[0].images[0].url;
            var artist_name = data.items[0].artists[0].name;
            if( latest_release !== subscribedArtists[j].latest_release){
              pool.query(('UPDATE "Subscribed_Artists" SET latest_release = $1 WHERE artist_id = $2'), [latest_release, subscribedArtists[j].artist_id], (err, result) => {
                pool.query('SELECT user_id FROM "Subscribed_Artists" WHERE artist_id = $1', [artist_id], (err, result) => {
                  const users = result.rows;
                  for (let i = 0; i < users.length; i++) {
                    // console.log("user_id",users[i].user_id)
                    pool.query('INSERT INTO "Notifications" (user_id, artist_id, artist_name, release_img, latest_release) VALUES ($1, $2, $3, $4, $5)', [users[i].user_id,artist_id,artist_name,release_img,latest_release], (err, result) => {
                      console.log("Notification added")
                      sendEmail(true);
                    });
                  }
                })
             });
            }
            else{
              console.log("No new releases");
              sendEmail(false);
            }
          })
          .catch(error => {
            console.error(error);
          });
        }
      });
    }
  });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
