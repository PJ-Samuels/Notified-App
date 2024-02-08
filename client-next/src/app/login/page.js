'use client';
import React,{ useEffect}  from 'react';
export default function Login() {
    useEffect(() => {
      const user_id = sessionStorage.getItem('user_id');
      sessionStorage.setItem('user_id', user_id);

      console.log("login reached")
      fetch(`http://localhost:5000/api/login?user_id=${user_id}`)
      .then((res) => res.text())
      .then((spotifyAuthUrl) => {
        console.log("spotify auth",spotifyAuthUrl)
        window.location.href = spotifyAuthUrl;
        // redirect(spotifyAuthUrl)
      })
    }, []);
    return(<div>
        <h1>Loading</h1>
    </div>);
};