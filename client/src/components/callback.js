import React, { useEffect } from 'react';

function Callback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    //fetch(`http://localhost:5000/api/callback?code=${code}&state=${state}`)
    fetch(`https://notified-webapp-0f26d6f34016.herokuapp.com/api/callback?code=${code}&state=${state}`)
      .then((res) => res.text())
      .then((spotifyAuthUrl) => {
        console.log("spotify auth",spotifyAuthUrl)
        window.location.href = spotifyAuthUrl;
      })
    .catch((error) => {
      });
  }, []);

  return <div>Loading...</div>;
}

export default Callback;