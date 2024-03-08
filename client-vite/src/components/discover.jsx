import React from 'react';
export default function Discover() {
    const user_id = sessionStorage.getItem('user_id');
    console.log("sessionStorage.getItem('user_id')",user_id)
    sessionStorage.setItem("user_id",JSON.parse(user_id));

    return(
        <div> Coming Soon!</div>
    )
}