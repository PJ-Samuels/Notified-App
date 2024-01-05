import React from "react";
import './css/user_nav.css';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function UserNav(){
    // const access_token = sessionStorage.getItem('access_token');
    // sessionStorage.setItem("access_token", access_token);
    const user_id = sessionStorage.getItem('user_id');
    sessionStorage.setItem("user_id",JSON.parse(user_id));

    const navigate = useNavigate();
    const artistSearchClick = () => {
        navigate("/artist_search?user_id="+user_id)
    }
    const homeClick = () => {
        navigate("/user_dashboard?user_id="+user_id)
    }
    const discoverClick = () => {
      sessionStorage.clear();
      navigate("/discover")
  }
    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
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
                <NavDropdown title="Releases" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.2">Popular</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Discover</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">My Notifications</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick = {handleLogout}> logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

