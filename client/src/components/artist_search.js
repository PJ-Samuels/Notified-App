import React from "react";
import { useEffect, useState } from "react";
import './css/artist_search.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function ArtistSearch() {
    const [access_token, setAccessToken] = useState('');
    const [refresh_token, setRefreshToken] = useState('');
    const [artistName, setArtistName] = useState("");
    const [artistImg, setArtistImg] = useState("");
    const [artistId, setArtistId] = useState("");
    const [data, setData] = React.useState([]);
    const [bool, setBool] = React.useState(false);
    useEffect(() => {
        if (access_token) {
            sessionStorage.setItem('access_token', access_token);
            setAccessToken(access_token);
          } else {
            const storedAccessToken = sessionStorage.getItem('access_token');
            if (storedAccessToken) {
              setAccessToken(storedAccessToken);
            } 
          }
          if (refresh_token) {
            sessionStorage.setItem('refresh_token', refresh_token);
            setRefreshToken(refresh_token);
          } else {
            const storedRefreshToken = sessionStorage.getItem('refresh_token');
            if (storedRefreshToken) {
              setRefreshToken(storedRefreshToken);
            }
          }
    })

    const handleInputChange = (event) => {
        setArtistName(event.target.value);
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData()
        setBool(true)
    };
    
    const handleRoute = async ()=> {
        const response = await fetch(`https://api.spotify.com/v1/artists/${data.id}/albums?limit=3`,{
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        });
        const query = new URLSearchParams(window.location.search);
        const user_id = query.get('user_id');
        const response_data = await response.json();
        const dataToEncode = JSON.stringify(response_data);
        const encodedData = encodeURIComponent(dataToEncode);
        const encodedName = encodeURIComponent(JSON.stringify(artistName));
        const encodedImg = encodeURIComponent(JSON.stringify(artistImg));
        const encodedID = encodeURIComponent(JSON.stringify(artistId));
        const encodedUserId = encodeURIComponent(JSON.stringify(user_id));
        const url = `/artist_page?data=${encodedData}&artist=${encodedName}&artistImg=${encodedImg}&artistID=${encodedID}&user_id=${encodedUserId}`;
        window.location.href = url;
    }

    const fetchData = async () => {
        const response = await fetch(`https://api.spotify.com/v1/search/?q=${artistName}&type=artist&limit=1`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        });
        if (response.ok) {
            const response_data = await response.json();
            setArtistName(response_data.artists.items[0].name);
            console.log("response data",response_data);
            console.log("response data",response_data.artists.items[0].images[1].url);
            console.log("response data",response_data.artists.items[0].name);
            setData(response_data.artists.items[0]);
            setArtistImg(response_data.artists.items[0].images[1].url);
            setArtistId(response_data.artists.items[0].id);
            }     
        else {
            console.log('Error:', response.status);
            }
        
    }
    useEffect(() => {
        if(bool === true){
        }
    }, [data]);


    
    return(
    <div>
        <h1>Artist Search</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Enter Artist Name" value={artistName} onChange={handleInputChange}autoComplete="off" />
        </Form.Group>
        <Button variant="primary" type="submit" value="Search">Submit</Button>
      </Form>
        {data && Object.keys(data).length > 0 && (
        <div className="top_artist">
            <h2>{data.name}</h2>
            <img src={data.images[1].url} alt="artist"/><br/>
            <Button onClick = {handleRoute}>Subscribe </Button>
        </div>
      )}
    </div>);
} 