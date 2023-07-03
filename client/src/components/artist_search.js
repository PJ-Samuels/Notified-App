import React from "react";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function ArtistSearch() {
    const access_token = sessionStorage.getItem('access_token');
    sessionStorage.setItem("access_token", access_token);
    const [artistName, setArtistName] = useState("");
    const [artistImg, setArtistImg] = useState("");
    const [artistId, setArtistId] = useState("");
    const [data, setData] = React.useState([]);
    const [bool, setBool] = React.useState(false);
    const navigate = useNavigate();



    const handleInputChange = (event) => {
        setArtistName(event.target.value);
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData()
        setBool(true);
        // console.log(artistName);
    };
    
    const handleRoute = async ()=> {
        // console.log(data.id)
        const response = await fetch(`https://api.spotify.com/v1/artists/${data.id}/albums?limit=3`,{
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        });

        const response_data = await response.json();
        const dataToEncode = JSON.stringify(response_data);
        const encodedData = encodeURIComponent(dataToEncode);
        const encodedName = encodeURIComponent(JSON.stringify(artistName));
        const encodedImg = encodeURIComponent(JSON.stringify(artistImg));
        const encodedID = encodeURIComponent(JSON.stringify(artistId));
        const url = `/artist_page?data=${encodedData}&artist=${encodedName}&artistImg=${encodedImg}&artistID=${encodedID}`;

        // console.log(window.location.href)
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
            // console.log("Updated Data:", data);
        }
    }, [data]);
    const handleBack = () => {
        navigate('/user_dashboard')
    }

    
    return(
    <div>
        <h1>Artist Search</h1>
        <form onSubmit = {handleSubmit}>
            <input type = "text" placeholder="Type Artist Name here" value = {artistName} onChange = {handleInputChange}/>
            <input type = "submit" value = "Search"></input>
        </form>
        <button onClick = {handleBack}> go back </button>
        {data && Object.keys(data).length > 0 && (
        <div>
            <h2>{data.name}</h2>
            <img src={data.images[1].url} alt="artist"/><br/>
            <button onClick = {handleRoute}>Subscribe </button>
        </div>
      )}
    </div>);
} 