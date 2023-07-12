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
    const navigate = useNavigate();
    const artistSearchClick = () => {
        navigate("/artist_search")
    }
    const homeClick = () => {
        navigate("/user_dashboard")
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
        ]}
        // renderProductHome={AtlassianProductHome}
        />
      </>
    )
}

