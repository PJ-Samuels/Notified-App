import React from "react";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("user_dash reached")
    fetch('http://localhost:5000/user_dash')
    .then((res) => res.text())
    .catch((error) => {
    });
    }, []);
   
    const handleClick = () => {
      navigate("/artist_search")
      console.log("button clicked")
    }
  handleClick();
  return( 
    <div>
      <h1>User Dashboard</h1>
      <button onClick = {handleClick}>Search for artist</button>
      <h2>Artists</h2>
      <h2>Notifications</h2>
      <h2>Discovoer</h2>
    </div>
  );
}