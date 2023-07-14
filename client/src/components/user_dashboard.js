import React from "react";
import { useEffect , useState} from "react";
import {useNavigate} from 'react-router-dom';
import './css/user_dashboard.css'

export default function UserDashboard() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [data, setData] = useState([]);
  const [token, setAccessToken] = useState('');
  const [user_id, setUserId] = useState('');
  // sessionStorage.setItem('access_token', access_token);
  // var access_token = sessionStorage.getItem('access_token');
  // setAccessToken(access_token);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    var access_token = params.get('accesstoken');
    var user_id = params.get('user_id');
    sessionStorage.setItem('access_token', access_token);
    access_token = sessionStorage.getItem('access_token');
    sessionStorage.setItem('user_id', user_id);
    setAccessToken(access_token);
    setUserId(user_id);
    if(user_id){
      fetch("http://localhost:5000/user_dashboard?user_id="+user_id)
      .then(res => res.json())
      .then(data => {
        setArtists(data)
      })
      fetch("http://localhost:5000/notification?user_id="+user_id)
    }
    }, []);
   

  const handleArtist = async (artist_id) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artist_id}/albums?limit=3`,{
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
    const response_data = await response.json();
    const dataToEncode = JSON.stringify(response_data);
    const encodedUserId = encodeURIComponent(user_id);
    const url = `/artist_page?data=${encodeURIComponent(dataToEncode)}&user_id=${encodedUserId}&artist_id=${encodeURIComponent(artist_id)}}`;
    window.location.href = url;
  }

  return( 
    <div>
      <h1>Your Dashboard</h1>
      <h2>Subscribed Artists</h2>
      <div className = "artists">
      {artists.map((artist) => (
        <div className= "artist_card" key={artist.artist_id}>
          <a>{artist.artist_name}</a><br/>
          <img onClick={() => handleArtist(artist.artist_id)} src={artist.artist_img} alt={artist.artist_name} />
        </div>
      ))}
      </div>
      <h2>Notifications</h2>
      <h2>Discover</h2>
    </div>
  );
}