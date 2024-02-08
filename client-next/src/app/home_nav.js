'use client';
import React, { useEffect } from "react";
// import './css/home_nav.css';
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/navigation';
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
    const router = useRouter();
    //const access_token = sessionStorage.getItem('access_token');
    const homeClick = () => {        
        router.push('/landing_page');
    }
    const handleLogin = () => {
        router.push('/');
    }

    return(
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

