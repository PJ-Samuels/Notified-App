import React, {useState, useEffect} from 'react';
// import Button from '@atlaskit/button';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
        window.location.href = "http://localhost:3000/"
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log("submit clicked")
        fetch("http://localhost:5000/signup",{
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({account})
        })
        .then((res) => res.text())
        .then((spotifyAuthUrl) => {
            console.log(spotifyAuthUrl)
            window.location.href = spotifyAuthUrl;
          })
    }
    return (
    <div>
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
        <div className= "go_back">
            <Button onClick = {handleClick}>Go back</Button>
        </div>
        
    </div>)
}