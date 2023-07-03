import './App.css';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const App = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [account_info, setAccountInfo] = useState(0)
  const [wrongPass, setWrongPass] = useState(false)




  useEffect(() => {
      fetch("http://localhost:5000/")
        .then((res) => res.json())
        .then((data) => setData(data));
  }, []);
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePassChange = (event) => {
    setPassword(event.target.value)
  }
  const handleClick = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/",{
      method: "POST",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({email,password})
    })
    .then((res) => res.json())
    .then((account_info) => {
      // console.log("account info ", account_info);
      setAccountInfo(account_info);
  
      if (account_info === 1) {
        navigate('/login');
      } else {
        setWrongPass(true);
        console.log("Not valid Password");
      }
    });
  
      
  }
  const handleSignup = (event) => {
    navigate('/signup')
  }

  
  return (
    <div>
      <h1>Notified Home page</h1>
      <h2>Login here</h2>
      <form onSubmit = {handleClick}>
        <input type = "text" placeholder='email' value = {email} onChange = {handleEmailChange}></input>
        <input type = "text" placeholder='password' value = {password} onChange = {handlePassChange}></input>
        <input type = "submit" value = "Spotify Login"></input>
      </form>
      {wrongPass && <a>email or password</a>}
      <h2>Sign Up here</h2>
        <button onClick = {handleSignup}>Sign Up</button>
      {/* {data.map((item, index) => (
        <a key={index}>{item}</a>
      ))} */}
    </div>
  );
};

export default App;
