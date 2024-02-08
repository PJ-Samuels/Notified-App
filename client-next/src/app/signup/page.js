'use client'
import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './signup.css';

export default function Signup(){

    const [account, setAccount] = useState({
            username: '',
            email: '',
            password: ''
        }
    )
    const handleAccount = (event) => {
        const { name, value } = event.target;
        setAccount((prevAccount) => ({
          ...prevAccount,
          [name]: value
        }));
      };
    const handleClick = () => {
        window.location.href = "/"
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({account})
            });
    
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
    
            // const spotifyAuthUrl = await response.text();
            // console.log("signup completed");
            // window.location.href = spotifyAuthUrl;
        } catch (error) {
            console.error('Error:', error);
            // Handle error: display an error message or take appropriate action
        }
    }
    return (
    <div>
        <div className= "go_back">
            <Button className = "go_back_button" onClick = {handleClick}>Go back</Button>
        </div>
        <h1>Sign Up</h1>
        {/* <form onSubmit = {handleSubmit}>
            <input type ="text" placeholder = 'username' name = "username" value = {account.username} onChange = {handleAccount}/><br/>
            <input type = "text" placeholder= 'email' name = "email" value = {account.email} onChange = {handleAccount}/><br/>
            <input type = "text" placeholder= 'password' name = "password" value = {account.password} onChange = {handleAccount}/><br/>
            <input type = "submit"/>
        </form> */}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="username" name = "username" value = {account.username} onChange = {handleAccount} autoComplete="off"/><br/>
                <Form.Control type="text" placeholder="email" name = "email" value = {account.email} onChange = {handleAccount} autoComplete="off"/><br/>
                <Form.Control type="text" placeholder="password" name = "password" value = {account.password} onChange = {handleAccount} autoComplete="off"/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </div>)
}