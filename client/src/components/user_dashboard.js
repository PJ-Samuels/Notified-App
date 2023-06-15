import React from "react";
import { useEffect } from "react";

export default function UserDashboard() {
useEffect(() => {
    console.log("user_dash reached")
    fetch('http://localhost:5000/user_dash')
    .then((res) => res.text())
    .catch((error) => {
    });
    }, []);
  return( <div>User Dashboard</div>);
}