import React,{ useEffect}  from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    useEffect(() => {
      const user_id = sessionStorage.getItem('user_id');
      sessionStorage.setItem('user_id', user_id);

      // fetch("/api/auth")
      fetch(`https://notified-webapp-0f26d6f34016.herokuapp.com/api/login?user_id=${user_id}`)
      .then((res) => res.text())
      .then((spotifyAuthUrl) => {
        console.log("spotify auth",spotifyAuthUrl)
        window.location.href = spotifyAuthUrl;
        // navigate("/callback")
      });
    }, []);
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
        console.log("logout")
      }
    return(<div>
        <h1>Notified Login page</h1>
        <button onClick = {handleLogout}>Logout</button>

    </div>);
};