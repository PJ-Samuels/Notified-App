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
    console.log(user_id)
    sessionStorage.setItem('access_token', access_token);
    access_token = sessionStorage.getItem('access_token');
    setAccessToken(access_token);
    setUserId(user_id);
    fetch("http://localhost:5000/user_dashboard?user_id="+user_id)
    .then(res => res.json())
    .then(data => {
      setArtists(data)
      // console.log(data);
    })
    fetch("http://localhost:5000/notification")
    // .then(console.log("notification"))

    }, []);
   
  // const handleClick = () => {
  //   navigate("/artist_search")
  // }
  const handleArtist = async () => {
    // console.log(data.id)
    const response = await fetch(`https://api.spotify.com/v1/artists/${data.id}/albums?limit=3`,{
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
    // console.log(response)
    const response_data = await response.json();
    const dataToEncode = JSON.stringify(response_data);
    const base64Data = btoa(dataToEncode)
    const url = `/artist_page?data=${encodeURIComponent(base64Data)}`;
    // console.log(window.location.href)
    window.location.href = url;
  }
  return( 
    <div>
      <h1>Your Dashboard</h1>
      {/* <button onClick = {handleClick}>Search for artist</button> */}
      <h2>Subscribed Artists</h2>
      {/* {artists && Array.isArray(artists)  > 0 && (artists.map((artist) => ()} */}
      <div className = "artists">
      {artists.map((artist) => (
        <div className= "artist_card" key={artist.artist_id}>
          <a>{artist.artist_name}</a><br/>
          <img onClick={handleArtist} src={artist.artist_img} alt={artist.artist_name} />
        </div>
      ))}
      </div>
      <h2>Notifications</h2>
      <h2>Discover</h2>
    </div>
  );
}