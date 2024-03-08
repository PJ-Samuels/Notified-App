import React, { useEffect , useState} from 'react';
// import {useNavigate} from 'react-router-dom';
import './css/artist_page.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import { ToggleSlider }  from "react-toggle-slider";

export default function ArtistPage() {
    const [artist_data, setArtistData] = useState([]);
    const [artist_single, setArtistSingle] = useState([]);
    const [artist_feature, setArtistFeature] = useState([]);
    const [artist_name, setArtistName] = useState("");
    const [artist_image, setArtistImg] = useState("");
    const [user_id, setUserId] = useState(null);
    const [artist_id, setArtistId] = useState("");
    const [subscribe_status, setSubscribeStatus] = useState(true);
    const access_token = sessionStorage.getItem("access_token");
    sessionStorage.setItem("access_token", access_token);
    const refresh_token = sessionStorage.getItem("refresh_token");
    sessionStorage.setItem("refresh_token", refresh_token);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const userId = JSON.parse(sessionStorage.getItem("user_id"));
        const data =  JSON.parse(sessionStorage.getItem("response_data"));
        const single=  JSON.parse(sessionStorage.getItem("response_single"));
        const feature =  JSON.parse(sessionStorage.getItem("response_feature"));
        const decodedName = JSON.parse(decodeURIComponent(query.get('artist')));
        console.log("artist page", data)
        console.log("artist page", single)
        console.log("artist page", feature)
        setUserId(userId);
        setArtistData(data);
        setArtistName(decodedName);
        setArtistSingle(single);
        setArtistFeature(feature);
        setArtistId(JSON.parse(decodeURIComponent(query.get('artistID'))));
        setArtistImg(JSON.parse(decodeURIComponent(query.get('artistImg'))));

    },[]);
    useEffect(() => {
        if (user_id !== null) {
          const queryParams = new URLSearchParams({ artist_name: artist_name, user_id: user_id }).toString();
          fetch(`http://localhost:5000/api/add_artist?${queryParams}`)
            .then(response => response.json())
            .then(data => {
              setSubscribeStatus(data);
            });
        }
      }, [user_id]);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const artist_info = {
            artist_name: artist_name,
            artist_id: artist_id,
            artist_image: artist_image,
            latest_release: artist_data.items[0].name
        }

        fetch("http://localhost:5000/api/artist_subscription",{
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({ artist_info: artist_info, subscribe_status: subscribe_status, user_id: user_id })
        })
        .then(response => response.json())
        .then(data => {
            setSubscribeStatus(data);
        });
    }
    // const handleBack = () => {
    //     navigate("/artist_search")
    // }
    const handleEmail = () => {
        // console.log("Emails");
    }
    const handleText = () => {
        // console.log("Texts");
    }   
    const handleBanner = () => {
        // console.log("Banners");
    }
    return(
        <div> 
            <div className='artist_header'>
                <h1>{artist_name}</h1><br/>
                <div className = "section">
                    <img src = {artist_image}></img><br/>
                    <div className= 'notifications'>
                        <h3>Notifications Options</h3>
                        <a>Emails</a>
                        <Form ><Form.Check className = "toggle" type="switch" id="custom-switch" label=""/></Form>
                        <a>Texts</a>
                        <Form ><Form.Check className = "toggle" type="switch" id="custom-switch" label=""/></Form>
                        <a>Banners</a>
                        <Form ><Form.Check className = "toggle" type="switch" id="custom-switch" label=""/></Form>
                        <a>Concerts</a>
                        <Form ><Form.Check className = "toggle" type="switch" id="custom-switch" label=""/></Form>
                        <a>Merch</a>
                        <Form ><Form.Check className = "toggle" type="switch" id="custom-switch" label=""/></Form>


                    {/* <form onSubmit={handleSubmit}>
                        <input type="submit" value={subscribe_status ? "Subscribed" : "Unsubscribed"} />
                    </form> */}
                    <Form  className = "submitter" onSubmit={handleSubmit}>
                        <Button  type="submit" variant={subscribe_status ? "success" : "danger"}>
                            {subscribe_status ? "Subscribed" : "Subscribe"}
                        </Button>
                    </Form>
                    </div>
                </div>
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
            <div className='singles'>
            {artist_single && Array.isArray(artist_single.items)  > 0 && (artist_single.items.map((single) => (
                <div className = "single_card" key = {single.id}>
                    <a>{single.name}</a><br/>
                    <img src = {single.images[1].url}></img>
                </div>
            )))}
            </div>
            <h2>Latest Features</h2>
            <div className='features'>
            {artist_feature && Array.isArray(artist_feature.items)  > 0 && (artist_feature.items.map((feature) => (
                <div className = "feature_card" key = {feature.id}>
                    <a>{feature.name}</a><br/>
                    <img src = {feature.images[1].url}></img>
                </div>
            )))}
            </div>

        </div>);
}