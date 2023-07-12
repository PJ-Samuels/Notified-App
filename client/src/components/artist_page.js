import React, { useEffect , useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './css/artist_page.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function ArtistPage() {
    const [artist_data, setArtistData] = useState([]);
    const [artist_name, setArtistName] = useState("");
    const [artist_image, setArtistImg] = useState("");
    const [artist_id, setArtistId] = useState("");
    const [subscribe_status, setSubscribeStatus] = useState(true);
    // const navigate = useNavigate();
    const access_token = sessionStorage.getItem("access_token");
    sessionStorage.setItem("access_token", access_token);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const encodedData = query.get('data');
        const decodedData = decodeURIComponent(encodedData);
        const data = JSON.parse(decodedData);
        const decodedName = JSON.parse(decodeURIComponent(query.get('artist')));
        setArtistData(data);
        setArtistName(decodedName);
        setArtistId(JSON.parse(decodeURIComponent(query.get('artistID'))));
        setArtistImg(JSON.parse(decodeURIComponent(query.get('artistImg'))));

        // const artistName = artist_name;
        // console.log(decodedName)
        const queryParams = new URLSearchParams({ artist_name: decodedName }).toString();
        fetch(`http://localhost:5000/add_artist?${queryParams}`)
            .then(response => response.json())
            .then(data => {
                setSubscribeStatus(data);
            })
    },[]);

    const handleSubmit = (event) =>{
        // console.log("artist data" ,artist_data.items[0])
        // console.log(artist_name)
        event.preventDefault();
        const artist_info = {
            artist_name: artist_name,
            artist_id: artist_id,
            artist_image: artist_image,
            latest_release: artist_data.items[0].name
        }

        fetch("http://localhost:5000/artist_subscription",{
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({ artist_info: artist_info, subscribe_status: subscribe_status })
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            setSubscribeStatus(data);
        });
    }
    // const handleBack = () => {
    //     navigate("/artist_search")
    // }
    return(
        <div> 
            <div className='artist_header'>
                <h1>{artist_name}</h1><br/>
                <img src = {artist_image}></img><br/>
                {/* <form onSubmit={handleSubmit}>
                    <input type="submit" value={subscribe_status ? "Subscribed" : "Unsubscribed"} />
                </form> */}
                <Form onSubmit={handleSubmit}>
                    <Button type="submit" variant={subscribe_status ? "success" : "danger"}>
                        {subscribe_status ? "Subscribed" : "Unsubscribed"}
                    </Button>
                </Form>
            </div>
            <h2>Latest Albums</h2>
            <div className='albums'>
            {artist_data && Array.isArray(artist_data.items)  > 0 && (artist_data.items.map((album) => (
                <div className = "album_card" key = {album.id}>
                    <a>{album.name}</a><br/>
                    <img src = {album.images[1].url}></img>
                </div>
            )))}
            </div>
            <h2>Latest Singles</h2>
            <h3 className= "not_implemented">to be added</h3>
            <h2>Latest Features</h2>
            <h3 className = "not_implemented">to be added</h3>
        </div>) ;
}