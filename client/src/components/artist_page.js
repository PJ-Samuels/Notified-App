import React, { useEffect } from 'react'
export default function ArtistPage() {

    useEffect(() => {
        fetch("http://localhost:5000/add_artist")
    },[]);

    const handleClick  = () =>{
        
    }
    return(<div> 
        <h1>Artist Page</h1>
        <button onClick = {handleClick}>Add Artist</button>
        </div>) ;
}