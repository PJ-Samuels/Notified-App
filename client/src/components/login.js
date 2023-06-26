import React,{ useEffect}  from 'react';
import {useNavigate} from 'react-router-dom';


export default function Login() {
    useEffect(() => {
      fetch('http://localhost:5000/login')
      .then((res) => res.text())
      .then((spotifyAuthUrl) => {
        window.location.href = spotifyAuthUrl;
      })
      .catch((error) => {
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