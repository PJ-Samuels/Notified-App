'use client';
import React from 'react';
import UserNav from '../user_nav';
export default function Discover() {
    useEffect(() => {
        const user_id = sessionStorage.getItem('user_id');
        sessionStorage.setItem("user_id",JSON.parse(user_id));
        console.log("sessionStorage.getItem('user_id')",user_id)
    },[]);

    return(
        <div>
            <UserNav />
            <div> Coming Soon!</div>
        </div>
    )
}