import React, { useEffect, useState } from "react";
import './css/user_nav.css';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function UserNav(){
    // const access_token = sessionStorage.getItem('access_token');
    // sessionStorage.setItem("access_token", access_token);
    const [user_id, setUserId] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      const storedUserId = JSON.parse(sessionStorage.getItem('user_id'));
      if (user_id === null && storedUserId) {
        // console.log("user nav user_id", storedUserId);
        setUserId(storedUserId);
      }
    }, []);

    const artistSearchClick = () => {
        // console.log("user nav artist click", access_token)
        if(user_id){
          sessionStorage.setItem("user_id", JSON.stringify(user_id));
          navigate("/artist_search?user_id="+user_id)
        }

    }
    const homeClick = () => {
        // console.log("user nav home click",access_token)
        if(user_id){
          sessionStorage.setItem("user_id", JSON.stringify(user_id));
          navigate("/user_dashboard?user_id="+user_id)
        }
    }
    const discoverClick = () => {
      sessionStorage.clear();
      navigate("/discover")
  }
    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/")
    }
    return(
          <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand onClick = {homeClick} >Notified </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick = {homeClick}>Home</Nav.Link>
                <Nav.Link onClick = {artistSearchClick}>Artist Search</Nav.Link>
                <NavDropdown title="Discover" id="basic-nav-dropdown">
                  {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                </NavDropdown>
                <Nav.Link onClick = {handleLogout}> logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

