import React from "react";
// import './css/ho_nav.css';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function HomeNav(){
    const access_token = sessionStorage.getItem('access_token');
    sessionStorage.setItem("access_token", access_token);
    // console.log(access_token)
    const navigate = useNavigate();
    // const artistSearchClick = () => {
    //     navigate("/artist_search")
    // }
    const homeClick = () => {
        navigate("/landing_page")
    }
    const handleLogin = () => {
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
            <NavDropdown title="Releases" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Popular</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Discover</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">My Notifcations</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>News</Nav.Link>
            <Nav.Link>FAQ</Nav.Link>
            <Nav.Link onClick = {handleLogin}> login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

