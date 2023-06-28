import React from "react";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access_token = params.get('accesstoken');
    // console.log(access_token);
    sessionStorage.setItem('access_token', access_token);
    }, []);
   
  const handleClick = () => {
    navigate("/artist_search")
  }
  handleClick();
  return( 
    <div>
      <h1>User Dashboard</h1>
      <button onClick = {handleClick}>Search for artist</button>
      <h2>Artists</h2>
      <h2>Notifications</h2>
      <h2>Discover</h2>
    </div>
  );
}