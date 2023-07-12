import React from "react";
// import './css/ho_nav.css';
import { useNavigate } from "react-router-dom";
import { token, setGlobalTheme } from '@atlaskit/tokens';  
import {
    AtlassianNavigation,
    PrimaryButton,
    PrimaryDropdownButton,
    ProductHome,
  } from '@atlaskit/atlassian-navigation';
// import ArtistSearch from "./artist_search";



export default function HomeNav(){
    const access_token = sessionStorage.getItem('access_token');
    sessionStorage.setItem("access_token", access_token);
    const navigate = useNavigate();
    // const artistSearchClick = () => {
    //     navigate("/artist_search")
    // }
    const homeClick = () => {
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
        //   <PrimaryDropdownButton onClick = {artistSearchClick}></PrimaryDropdownButton>,
            <PrimaryDropdownButton>Releases</PrimaryDropdownButton>,
            <PrimaryButton>News</PrimaryButton>,
            <PrimaryButton>FAQ</PrimaryButton>,
            <PrimaryButton>login</PrimaryButton>,
        ]}
        // renderProductHome={AtlassianProductHome}
        />
      </>
    )
}

