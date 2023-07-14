import React from "react";
import './css/user_nav.css';
import { useNavigate } from "react-router-dom";
import { token, setGlobalTheme } from '@atlaskit/tokens';  
import {
    AtlassianNavigation,
    PrimaryButton,
    PrimaryDropdownButton,
    ProductHome,
  } from '@atlaskit/atlassian-navigation';
import ArtistSearch from "./artist_search";



export default function UserNav(){
    const access_token = sessionStorage.getItem('access_token');
    sessionStorage.setItem("access_token", access_token);
    const user_id = sessionStorage.getItem('user_id');
    sessionStorage.setItem("user_id", user_id);
    const navigate = useNavigate();
    const artistSearchClick = () => {
        navigate("/artist_search?user_id="+user_id)
    }
    const homeClick = () => {
        navigate("/user_dashboard?user_id="+user_id)
    }

    const handleLogout = () => {
        sessionStorage.clear();
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
      <>      
        <AtlassianNavigation
        label="site"
        primaryItems={[
          <PrimaryButton onClick={homeClick}>Home</PrimaryButton>,
          <PrimaryDropdownButton onClick = {artistSearchClick}>Artist Search</PrimaryDropdownButton>,
          <PrimaryDropdownButton>Discover</PrimaryDropdownButton>,
          <PrimaryButton>Dashboard</PrimaryButton>,
          <PrimaryButton onClick = {handleLogout}>logout</PrimaryButton>,
        ]}
        // renderProductHome={AtlassianProductHome}
        />
      </>
    )
}

