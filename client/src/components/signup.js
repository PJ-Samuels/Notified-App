import React, {useState, useEffect} from 'react';

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
    const handleSubmit = () =>{
        console.log("submit clicked")
        fetch("http://localhost:5000/signup",{
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({account})
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }
    return (
    <div>
        <h1>Sign up Page</h1>
        <form onSubmit = {handleSubmit}>
            <input type ="text" placeholder = 'username' name = "username" value = {account.username} onChange = {handleAccount}></input><br></br>
            <input type = "text" placeholder= 'email' name = "email" value = {account.email} onChange = {handleAccount}></input><br></br>
            <input type = "text" placeholder= 'password' name = "password" value = {account.password} onChange = {handleAccount}></input><br></br>
            <input type = "submit"></input>
        </form>
        
    </div>)
}