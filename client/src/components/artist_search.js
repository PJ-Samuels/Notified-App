import React from "react";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';


export default function ArtistSearch() {
    const access_token = sessionStorage.getItem('access_token');
    sessionStorage.setItem("access_token", access_token);
    const [artistName, setArtistName] = React.useState("");
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
        console.log(artistName);
    };
    
    const handleRoute = () => {
        navigate('/artist_page'); 
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
            setData(response_data.artists.items[0]);
            }     
        else {
            console.log('Error:', response.status);
            }
        
    }
    useEffect(() => {
        if(bool === true){
            console.log("Updated Data:", data);
        }
    }, [data]);
    
    return(
    <div>
        <h1>Artist Search</h1>
        <form onSubmit = {handleSubmit}>
            <input type = "text" placeholder="Type Artist Name here" value = {artistName} onChange = {handleInputChange}/>
            <input type = "submit" value = "Search"></input>
        </form>
        {data && Object.keys(data).length > 0 && (
        <div>
            <h2>{data.name}</h2>
            <img src={data.images[1].url} alt="artist"/>
            <button onClick = {handleRoute}>Subscribe </button>
        </div>
      )}
    </div>);
} 