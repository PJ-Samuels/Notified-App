import React from "react";
// import './css/home_nav.css';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

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
    //   <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand onClick = {homeClick} >Notified </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link onClick = {homeClick}>Home</Nav.Link>
    //         <NavDropdown title="Releases" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Popular</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">Discover</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">My Notifcations</NavDropdown.Item>
    //         </NavDropdown>
    //         <Nav.Link>News</Nav.Link>
    //         <Nav.Link>FAQ</Nav.Link>
    //         <Nav.Link onClick = {handleLogin}> login</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
        <Box className = "bg-body-tertiary"sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick = {homeClick}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div">
                Notified
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    Releases
                  </Button>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    News
                  </Button>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    FAQ
                  </Button>
              </Box>
              <Button color="inherit" onClick={handleLogin} >Login</Button>
            </Toolbar>
          </AppBar>
        </Box>

    )
}

