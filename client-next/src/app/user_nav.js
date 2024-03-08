'use client';
import React from "react";
import './user_nav.css';
// import { useNavigate } from "react-router-dom";
import{useRouter} from 'next/navigation'
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
import { styled, alpha } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { purple } from '@mui/material/colors';

export default function UserNav(){
    // const access_token = sessionStorage.getItem('access_token');
    // sessionStorage.setItem("access_token", access_token);
    const router = useRouter();
    const user_id = sessionStorage.getItem('user_id');
    sessionStorage.setItem("user_id",JSON.parse(user_id));
    console.log(user_id)
    
    const artistSearchClick = () => {
      router.push('/artist_search')
    }
    const homeClick = () => {
      router.push('/user_dashboard')
    }
    const discoverClick = () => {
      router.push('/discover')
    }
    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        router.push('/')
    }
    const theme = createTheme({
      palette: {
        primary: {
          main: '#1DB954',
        },
        secondary: {
          main: '#1DB954',
        },
      },
    });
    return(
        //   <Navbar expand="lg" className="bg-body-tertiary justify-content-between" data-bs-theme="dark" >
        //   <Container>
        //     <Navbar.Brand onClick = {homeClick} >Notified </Navbar.Brand>
        //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //     <Navbar.Collapse id="basic-navbar-nav">
        //       <Nav className="me-auto">
        //         <Nav.Link onClick = {homeClick}>Home</Nav.Link>
        //         <Nav.Link onClick = {artistSearchClick}>Artist Search</Nav.Link>
        //         <NavDropdown title="Releases" id="basic-nav-dropdown">
        //           <NavDropdown.Item href="#action/3.2">Popular</NavDropdown.Item>
        //           <NavDropdown.Item href="#action/3.1">Discover</NavDropdown.Item>
        //           <NavDropdown.Divider />
        //           <NavDropdown.Item href="#action/3.4">My Notifications</NavDropdown.Item>
        //         </NavDropdown>
        //         <Nav.Link onClick = {handleLogout} xs="auto"> logout</Nav.Link>
        //       </Nav>
        //     </Navbar.Collapse>
        //   </Container>
        // </Navbar>
        <ThemeProvider theme={theme}>
        <Box color = "secondary" className = "user-dash" sx={{ flexGrow: 1 }}>
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
                  <Button onClick = {discoverClick} sx={{ my: 2, color: 'white', display: 'block' }}>
                    Releases
                  </Button>
                  <Button onClick={artistSearchClick} sx={{color: 'white', display: 'block' }}>
                    <SearchIcon />
                  </Button>
              </Box>


              <Badge color="error">
                <NotificationsIcon />
              </Badge>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick = {homeClick}
              >
                <AccountCircle />
              </IconButton>


              <Button color="inherit" onClick={handleLogout} >Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
        </ThemeProvider>
    )
}
