import React from "react";
// import './css/ho_nav.css';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { token, setGlobalTheme } from '@atlaskit/tokens';  
// import {
//     AtlassianNavigation,
//     PrimaryButton,
//     PrimaryDropdownButton,
//     ProductHome,
//   } from '@atlaskit/atlassian-navigation';
// import ArtistSearch from "./artist_search";



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

    // setGlobalTheme({
    //     light: 'light',
    //     dark: 'dark',
    //     colorMode: 'auto',
    //     typography: 'typography',
    //   });
      

    //style={{backgroundColor: token('elevation.surface')}}
    return(
      // <>      
      //   <AtlassianNavigation
      //   label="site"
      //   primaryItems={[
      //       <PrimaryButton onClick={homeClick}>Home</PrimaryButton>,
      //       <PrimaryDropdownButton>Releases</PrimaryDropdownButton>,
      //       <PrimaryButton>News</PrimaryButton>,
      //       <PrimaryButton>FAQ</PrimaryButton>,
      //       <PrimaryButton onClick = {handleLogin}>login</PrimaryButton>,

      //   ]}

      //   />
      // </>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick = {homeClick} >Notified </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick = {homeClick}>Home</Nav.Link>
            <NavDropdown title="Releases" id="basic-nav-dropdown">
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
            <Nav.Link>News</Nav.Link>
            <Nav.Link>FAQ</Nav.Link>
            <Nav.Link onClick = {handleLogin}> login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

