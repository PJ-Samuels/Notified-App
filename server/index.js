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
var user_id;
const cron = require('node-cron');
//const moment = require('moment-timezone');


var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

app.get('/', (req, res) => {
    const data = ["This is the server"];
    res.json(data);
  });
app.post('/',async (req,res) =>{
  pool.query('SELECT email, password FROM "Users" WHERE email = $1 AND password = $2', [req.body.email, req.body.password])
  .then(result => {
    if (result.rowCount > 0) {
      // console.log(result.rows);
      pool.query('SELECT id FROM "Users" WHERE email = $1 AND password = $2', [req.body.email, req.body.password])
        .then(result2 => {
          // console.log(result2.rows[0].id);
          user_id = result2.rows[0].id;
          // console.log("valid password");
          res.json(1);
        });
    } else {
      throw new Error('Invalid credentials');
    }
  })
  .catch(error => {
    console.error(error);
    res.json(0);
  });
})

app.post('/signup', (req, res) => {
  const account = req.body.account;
  const result = pool.query('INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3)', [account.username, account.email, account.password], (err, result) => {
    if (err) {
      console.log(err);
      res.redirect('/signup');
    } else {
      console.log("success");
        const new_result = pool.query('SELECT id FROM "Users" WHERE username = $1 AND email = $2 AND password = $3', [account.username, account.email, account.password], (err, result) => {
        user_id = result.rows[0].id;
      });
      res.redirect('/login');
    }
  });
});


app.get('/login', function(req, res) {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
      var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
      spotifyAuthUrl = 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString();
    res.send(spotifyAuthUrl);
  });
  
app.get('/callback', function(req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
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
        res.send('http://localhost:3000/user_dashboard?accesstoken=' + access_token);
      }
    });
  }

});

app.get('/user_dashboard', (req, res) => {
  const subscribed_artist = pool.query('SELECT * FROM "Subscribed_Artists" WHERE user_id = $1', [user_id], (err, result) => {
    // console.log(result.rows)
    res.json(result.rows);

  });
});
app.get('/add_artist', (req, res) => {
  const artist_name = req.query.artist_name;
  pool.query('SELECT * FROM "Subscribed_Artists" WHERE user_id = $1 AND artist_name = $2', [user_id, artist_name], (err, result) => {
    if (result.rowCount > 0) {
      //console.log("Subscribed artist exists");
      res.json(true);
    } else {
      //console.log("Subscribed artist does not exist");
      res.json(false);
    }
  
  });
});
app.post('/artist_subscription', (req, res) => {
  const newArtist = req.body.artist_info;
  const subscribe_status = req.body.subscribe_status;
  if (subscribe_status === false) {
    const newArtistQuery  =  pool.query(`INSERT INTO "Subscribed_Artists" (user_id, artist_id, artist_name, artist_img, latest_release) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user_id, newArtist.artist_id, newArtist.artist_name, newArtist.artist_image, newArtist.latest_release, ], (err, result) => {
      // console.log('New artist inserted');
      res.json((true))
    });
  }
  else {
    const newArtistQuery  =  pool.query(`DELETE FROM "Subscribed_Artists" WHERE artist_id = $1 AND user_id = $2`, [newArtist.artist_id, user_id], (err, result) => {
      // console.log('Artist deleted');
      res.json((false))
    });
  }
});

app.get('/notification', (req, res) => {
  // console.log("notifications reached")
  const subscribed_artist = pool.query('SELECT * FROM "Subscribed_Artists" WHERE user_id = $1', [user_id], (err, result) => {
    // console.log(result.rows)
  });
});

function sendEmail(bool){
  if (bool === true) {
    console.log("send email to user")
  }
}

cron.schedule('*/.10 * * * *', () => {
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
    if (!error && response.statusCode === 200) {
      var token = body.access_token;

      pool.query(('SELECT artist_id, MAX(latest_release) AS latest_release FROM "Subscribed_Artists" GROUP BY artist_id'), (err, result) => {
        const subscribedArtists = result.rows;
        console.log("subscribed_artists",subscribedArtists);
        console.log("subscribed_artists",subscribedArtists);
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
            console.log(data.items[0].name);
            var latest_release = data.items[0].name;
            var release_img = data.items[0].images[0].url;
            var artist_name = data.items[0].artists[0].name;
            if( latest_release == subscribedArtists[j].latest_release){
              pool.query(('UPDATE "Subscribed_Artists" SET latest_release = $1 WHERE artist_id = $2'), [latest_release, subscribedArtists[j].artist_id], (err, result) => {
                pool.query('SELECT user_id FROM "Subscribed_Artists" WHERE artist_id = $1', [artist_id], (err, result) => {
                  const users = result.rows;
                  for (let i = 0; i < users.length; i++) {
                    // pool.query('INSERT INTO "Notifications" (user_id, artist_id, artist_name, release_img, latest_release) VALUES ($1, $2, $3, $4, $5)', [users[i].user_id,artist_name,release_img,latest_release], (err, result) => {
                    pool.query('INSERT INTO "Notifications" (user_id, artist_id, artist_name, release_img, latest_release) VALUES ($1, $2, $3, $4, $5)', [users[i].user_id,"test","test","test","test"], (err, result) => { //missing current DATE
                      console.log("Notification added")
                      sendEmail(true);
                    });
                  }
                })
              console.log(`Updated latest_release for artist_id ${subscribedArtists[j].artist_id}`);
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
