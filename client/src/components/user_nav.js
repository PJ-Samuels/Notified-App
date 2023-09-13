import React, { useEffect, useState } from "react";
import './css/user_nav.css';
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



export default function UserNav(){
    // const access_token = sessionStorage.getItem('access_token');
    // sessionStorage.setItem("access_token", access_token);
    const [user_id, setUserId] = useState(null);
    // const user_id = JSON.parse(sessionStorage.getItem('user_id'));

    // console.log("user_id", user_id)
    const navigate = useNavigate();
    useEffect(() => {
      if (user_id === null) {
        const storedUserId = JSON.parse(sessionStorage.getItem('user_id'));
        sessionStorage.setItem("user_id", user_id);
        if (storedUserId) {
          setUserId(storedUserId);
        }
      }

    }, []);

    const artistSearchClick = () => {
        // console.log("user nav artist click", access_token)
        if(user_id){
          navigate("/artist_search?user_id="+user_id)
        }

    }
    const homeClick = () => {
        // console.log("user nav home click",access_token)
        if(user_id){
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
    // const handleDash = () => {
    //     navigate("/user_dashboard?user_id="+user_id)
    // }
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
      //     <PrimaryButton onClick={homeClick}>Home</PrimaryButton>,
      //     <PrimaryDropdownButton onClick = {artistSearchClick}>Artist Search</PrimaryDropdownButton>,
      //     <PrimaryDropdownButton onClick ={homeClick}>Discover</PrimaryDropdownButton>,
      //     <PrimaryButton onClick= {homeClick}>Dashboard</PrimaryButton>,
      //     <PrimaryButton onClick = {handleLogout}>logout</PrimaryButton>,
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

