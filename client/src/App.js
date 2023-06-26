import './App.css';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const App = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
      fetch("http://localhost:5000/")
        .then((res) => res.json())
        .then((data) => setData(data));
  }, []);
  const handleUserChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePassChange = (event) => {
    setPassword(event.target.value)
  }
  const handleClick = () => {
    //make post call to see if posgress has data for login if it doesnt then show an error
    navigate('/login');
    console.log("button clicked")
  }
  const handleSignup = (event) => {
    navigate('/signup')
  }

  return (
    <div>
      <h1>Notified Home page</h1>
      <h2>Login here</h2>
      <form onSubmit = {handleClick}>
        <input type = "text" placeholder='Username' value = {username} onChange = {handleUserChange}></input>
        <input type = "text" placeholder='password' value = {password} onChange = {handlePassChange}></input>
        <input type = "submit" value = "Spotify Login"></input>
      </form>
      {/* <button onClick = {handleClick}>Spotify Login</button><br></br> */}
      <h2>Sign Up here</h2>
        <button onClick = {handleSignup}>Sign Up</button>
      {/* {data.map((item, index) => (
        <a key={index}>{item}</a>
      ))} */}
    </div>
  );
};

export default App;
