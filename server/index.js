const express = require('express');
const cors = require('cors');
const request = require('request');
const querystring = require('querystring')
const app = express();
const config = require('./config.js');
const pool = require('./db.js');
var client_id = config.CLIENT_ID;
var client_secret = config.CLIENT_SECRET;
var redirect_uri = 'http://localhost:3000/callback';



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

app.get('/', (req, res) => {
    const data = ["This is the server"];
    res.json(data);
  });
app.post('/',(req,res) =>{
  console.log("checking email")
})


app.get('/login', function(req, res) {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
      var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: "http://localhost:3000/callback",
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
        redirect_uri: "http://localhost:3000/callback",
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


app.post('/add_artist', (req, res) => {
  console.log("add artist reached")
  // const newArtist = {
  //   artist_name: "test",
  //   artist_id: "test",
  //   artist_image: "test"
  // }
  // const newArtistQuery  =  pool.query('INSERT INTO "Artists" (artist_id, artist_name, artist_image) VALUES ($1, $2, $3) RETURNING *', [newArtist.artist_id, newArtist.artist_name, newArtist.artist_image], (err, result) => {
  //   if (err) {
  //     console.error('Error inserting new artist:', err);
  //   } else {
  //     console.log('New artist inserted:', result.rows[0]);
  //   }
  // });

});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
