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
    // const access_token = sessionStorage.getItem('access_token');
    // sessionStorage.setItem("access_token", access_token);
    const user_id = sessionStorage.getItem('user_id');
    sessionStorage.setItem("user_id", user_id);
    const navigate = useNavigate();
    const artistSearchClick = () => {
        // console.log("user nav artist click", access_token)
        navigate("/artist_search?user_id="+user_id)
    }
    const homeClick = () => {
        // console.log("user nav home click",access_token)
        navigate("/user_dashboard?user_id="+user_id)
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
      <>      
        <AtlassianNavigation
        label="site"
        primaryItems={[
          <PrimaryButton onClick={homeClick}>Home</PrimaryButton>,
          <PrimaryDropdownButton onClick = {artistSearchClick}>Artist Search</PrimaryDropdownButton>,
          <PrimaryDropdownButton onClick ={homeClick}>Discover</PrimaryDropdownButton>,
          <PrimaryButton onClick= {homeClick}>Dashboard</PrimaryButton>,
          <PrimaryButton onClick = {handleLogout}>logout</PrimaryButton>,
        ]}
        // renderProductHome={AtlassianProductHome}
        />
      </>
    )
}

