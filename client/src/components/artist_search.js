import React from "react";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';


export default function ArtistSearch() {

    return(
    <div>
        <h1>Artist Search</h1>
        <form>
            <input type = "text" placeholder="Type Artist Name here"></input>
            <input type = "submit" value = "Search"></input>
        </form>
        
    </div>);
}