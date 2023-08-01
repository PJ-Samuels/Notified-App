import React from "react";
import { useEffect , useState} from "react";
import {useNavigate} from 'react-router-dom';
import './css/user_dashboard.css'

export default function UserDashboard() {
  // const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [data, setData] = useState([]);
  const [token, setAccessToken] = useState('');
  const [user_id, setUserId] = useState('');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    var access_token = params.get('accesstoken');
    var user_id = params.get('user_id');
    setUserId(user_id);
    if (access_token && user_id) {
      sessionStorage.setItem('access_token', access_token);
      setAccessToken(access_token);

    } else {
      const storedAccessToken = sessionStorage.getItem('access_token');
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    }
    if(user_id){
      fetch("http://localhost:5000/user_dashboard?user_id="+user_id)
      .then(res => res.json())
      .then(data => {
        setArtists(data)
      })
      fetch("http://localhost:5000/notification?user_id="+user_id)
      .then(res => res.json())
      .then(data => {
        setNotifications(data)
        console.log(data)
      });
    }
    }, []);
   

  const handleArtist = async (artist_id, artist_name) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artist_id}/albums?limit=3`,{
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
    const response2 = await fetch(`https://api.spotify.com/v1/search/?q=${artist_name}&type=artist&limit=1`, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token,
      }
  });
  
    const response_data = await response.json();
    const response_data2 = await response2.json();
    const dataToEncode = JSON.stringify(response_data);
    const encodedData = encodeURIComponent(dataToEncode);
    const encodedName = encodeURIComponent(JSON.stringify(artist_name));
    const encodedImg = encodeURIComponent(JSON.stringify(response_data2.artists.items[0].images[1].url));
    const encodedID = encodeURIComponent(JSON.stringify(response_data2.artists.items[0].id));
    const encodedUserId = encodeURIComponent(JSON.stringify(user_id));
    const url = `/artist_page?data=${encodedData}&artist=${encodedName}&artistImg=${encodedImg}&artistID=${encodedID}&user_id=${encodedUserId}`;
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
          <img onClick={() => handleArtist(artist.artist_id, artist.artist_name)} src={artist.artist_img} alt={artist.artist_name} />
        </div>
      ))}
      </div>
      <h2>Notifications</h2>
      <div className = "artists">
      {notifications.map((notification) => (
        <div className= "artist_card" key={notification.artist_id}>
          <a>{notification.artist_name}</a><br/>
          <a>{notification.latest_release}</a><br/>
          <img src={notification.release_img} alt={notification.artist_name}/>
          </div>
        ))}
      </div>
      <h2>Discover</h2>
      <h3>Coming Soon!</h3>
    </div>
  );
}