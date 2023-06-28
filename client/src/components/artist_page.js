import React, { useEffect , useState} from 'react';

export default function ArtistPage() {
    const [artist_data, setArtistData] = useState([]);
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const encodedData = query.get('data');
        const decodedData = atob(encodedData);
        const data = JSON.parse(decodedData);
        setArtistData(data);
        console.log(data);
        // fetch("http://localhost:5000/add_artist")
    },[]);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const artist_info = {
            artist_name: artist_data.items[0].name,
            artist_id: artist_data.items[0].id,
            artist_image: artist_data.items[0].images[1].url
        }

        fetch("http://localhost:5000/add_artist",{
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({artist_info})
        })
    }
    return(<div> 
        <h1>Artist Page</h1>
        <h2>Artist Albums</h2>
        {/* <button onClick = {handleClick}> GET Add Artist</button> */}
        <form onSubmit={handleSubmit}>
            <input type = "submit"></input>
        </form>
        {artist_data && Array.isArray(artist_data.items)  > 0 && (artist_data.items.map((album) => (
            <div key = {album.id}>
                <a>{album.name}</a><br/>
                <img src = {album.images[1].url}></img>
            </div>
        )))}
        </div>) ;
}