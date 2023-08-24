
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import {useNavigate, useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const App = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [account_info, setAccountInfo] = useState(0)
  const [wrongPass, setWrongPass] = useState(false)
  const history = useHistory();
  history.push('/landing_page');
  useEffect(() => {
      //fetch("http://localhost:5000/api")
      fetch("/api/")
        // .then((res) => res.json())
        // .then((data) => setData(data));
  }, []);
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePassChange = (event) => {
    setPassword(event.target.value)
  }
  const handleTest = (event) => {
    event.preventDefault();
    console.log("test pressed")
    fetch("/api/test",{
      method: "POST",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({email,password})
    })
    history.push('/landing_page');
  }
  const handleClick = (event) => {
    event.preventDefault();
    console.log("login pressed")
    //fetch("http://localhost:5000/api",{
    fetch("/api/",{
      method: "POST",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({email,password})
    })
    .then((res) => res.json())
    .then((account_info) => {
      setAccountInfo(account_info[0]);
      // console.log("User_id ", account_info[1]);
      
      if (account_info[0] === 1) {
        sessionStorage.setItem('user_id', account_info[1]);
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
    <div className = "login_page">
      <h1>Notified</h1>
      <h2>Login</h2>
      <Form onSubmit={handleTest}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="email" value={email} onChange={handleEmailChange} autoComplete="off"/><br/>
          <Form.Control type="password" placeholder="password" value={password} onChange={handlePassChange} autoComplete="off"/>
        </Form.Group>
        <Button variant="primary" type="submit" value="Spotify Login">Login</Button>
      </Form>
      {/* <form onSubmit = {handleClick}>
        <input type = "text" placeholder='email' value = {email} onChange = {handleEmailChange}/><br/>
        <input type = "text" placeholder='password' value = {password} onChange = {handlePassChange}/><br/>
        <input type = "submit" value = "Spotify Login"/><br/>
      </form> */}
      {wrongPass && <a className = "error_msg">incorrect email or password try again</a>}
      <h3>Sign Up</h3>
      <Button className = "signup" appearance = "primary" onClick = {handleSignup}>Sign Up</Button>
    </div>
  );
};

export default App;
