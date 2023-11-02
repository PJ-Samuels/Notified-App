const express = require('express');
const cors = require('cors');
const request = require('request');
const querystring = require('querystring')
const bodyParser = require('body-parser');
const app = express();

// const config = require('./config.js');
// const pool = require('./db.js');
// var client_id = config.CLIENT_ID;
// var client_secret = config.CLIENT_SECRET;
// var redirect_uri = 'http://localhost:3000/callback';
const {Pool}= require('pg');
const session = require('express-session');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
var validator = require("email-validator");
const bcrypt = require("bcrypt")
const port = process.env.PORT || 5000;
const path = require('path');

const client_id = process.env.CLIENT_ID; 
const client_secret = process.env.CLIENT_SECRET;
var redirect_uri = 'https://notified-webapp-0f26d6f34016.herokuapp.com/api/callback';
console.log(process.env.NOTIFIED_URL)
const pool = new Pool({
  connectionString: process.env.NOTIFIED_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
pool.connect();


var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const corsOptions = {
  origin: ['https://notified-webapp-0f26d6f34016.herokuapp.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(
  corsOptions
));


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.json());
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, '../client/build')))
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));


app.get('/api/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
  });
});

// app.post('/api/test', function(req, res) {
//   res.redirect('https://notified-webapp-0f26d6f34016.herokuapp.com?test=1');
  
// });
app.post('/api/',async (req,res) =>{
  console.log("index.hmtl post reached")
  try{

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
    } 
    else {
      console.log("index.html post")
      console.log("Invalid email");
      res.json([0, null]);
    }
  }catch(err){
    console.log(err)
    res.json([0, null]);
  }
});

app.post('/api/signup', async (req, res) => {
  const account = req.body.account;
  const password = account.password;

  if (validator.validate(account.email)) {
    console.log("Valid email");
  }
  else{
    return res.send('https://notified-webapp-0f26d6f34016.herokuapp.com/signup');
  }
  pool.query('SELECT id FROM "Users" WHERE email = $1', [account.email],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.send('https://notified-webapp-0f26d6f34016.herokuapp.com/signup');
      }

      if (result.rows.length > 0) {
        console.log("User already exists");
        return res.send('https://notified-webapp-0f26d6f34016.herokuapp.com/signup');
      }
      pool.query(
        'INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3) RETURNING id',
        [account.username, account.email, password],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.redirect('https://notified-webapp-0f26d6f34016.herokuapp.com/signup');
          }

          const user_id = result.rows[0].id;
          req.session.user_id = user_id;
          // res.redirect('/api/login');
          const state = generateRandomString(16);
          const uniqueIdentifier = generateUniqueIdentifier(req, state, user_id);
          const scope = 'user-read-private user-read-email';
          const auth_query_parameters = new URLSearchParams({
            response_type: "code",
            client_id,
            scope,
            redirect_uri,
            state,
          });
          const spotifyAuthUrl = 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString();
          res.send(spotifyAuthUrl);
        }
      );
    }
  );
});


function generateUniqueIdentifier(req, state, user_id) {
  const query = 'INSERT INTO unique_identifiers (user_state, user_id) VALUES ($1, $2)';
  pool.query(query, [state, user_id])
    .then(result => {
    })
  return state;
}

app.get('/api/login', async function(req, res) {
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
  console.log("spotify auth url", spotifyAuthUrl)
  res.send(spotifyAuthUrl);
});
  
app.get('/api/callback', function(req, res) {
  console.log("callback reached")
  var code = req.query.code || null;
  var state = req.query.state || null;
  var user_id;
  // console.log("user_id", req.session.user_id)
  const query = 'SELECT user_id FROM unique_identifiers WHERE user_state = $1';
  pool.query(query, [state])
  .then(result => {
    if (result.rows.length > 0) {
      user_id = result.rows[0].user_id;
      req.session.user_id = user_id;
      //console.log("user_id from identifier", user_id)
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
    res.redirect('/api/callback' +
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
        var refresh_token = body.refresh_token;
        var expiration_time = body.expires_in;
        const data = {
          access_token: access_token,
          refresh_token: refresh_token,
          user_id: user_id,
          expiration_time: expiration_time
        }
        //res.send(`http://localhost:3000/user_dashboard?accesstoken=${access_token}&refreshtoken=${refresh_token}&user_id=${user_id}&expiration_time=${expiration_time}`);
        res.redirect(`https://notified-webapp-0f26d6f34016.herokuapp.com/user_dashboard?accesstoken=${access_token}&refreshtoken=${refresh_token}&user_id=${user_id}&expiration_time=${expiration_time}`);
      }
    });
  }

});

app.get('/api/user_dashboard', (req, res) => {
  const user_id = req.query.user_id;
  console.log("user_id user dashboard", user_id)
  const subscribed_artist = pool.query('SELECT * FROM "Subscribed_Artists" WHERE user_id = $1', [user_id], (err, result) => {
    res.json(result.rows);

  });
});
app.get('/api/add_artist', (req, res) => {
  const artist_name = req.query.artist_name;
  const user_id = req.query.user_id;
  pool.query('SELECT * FROM "Subscribed_Artists" WHERE user_id = $1 AND artist_name = $2', [user_id, artist_name], (err, result) => {
    if (result.rowCount && result.rowCount > 0) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

app.post('/api/artist_subscription', (req, res) => {
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

app.get('/api/notification', (req, res) => {
  const user_id = req.query.user_id;
  const subscribed_artist = pool.query('SELECT * FROM "Notifications" WHERE user_id = $1', [user_id], (err, result) => {
    res.json(result.rows);
  });
});


app.get('/api/refresh_token', function(req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    const newAccessToken = body.access_token;
    const newExpiresIn = body.expires_in;
    res.json({newAccessToken, newExpiresIn})
  });
});

function sendEmail(bool, latest_release, artist_name, release_img){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pjsamuels3@gmail.com',
      pass: process.env.GMAIL_PASSWORD,
      // pass: config.GMAIL_PASSWORD,
    },
  });
  if (bool === true) {
    console.log("send email to user")
    const mailOptions = {
      from: 'pjsamuels3@gmail.com',
      to: 'osamuels@bu.edu',
      subject: 'New Release',
      // text: `${artist_name} just Released a new album: ${latest_release}`,
      html: `<p>${artist_name} just Released a new album: ${latest_release}</p><img src="${imageUrl}" alt="Album Cover" />`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      // console.log('Email sent: ' + info.response);
      res.send('Email sent successfully.');
    });  
  }
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

const timeZone = 'America/New_York';
const cronSchedule = `${moment().tz(timeZone).startOf('hour').format('m')} * * * *`;
const cronSchedule2 = `*/1 * * * *`;
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
                      sendEmail(true, latest_release, artist_name, release_img);
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

app.listen(port, () => {
    console.log('Server is running on port 5000');
})
