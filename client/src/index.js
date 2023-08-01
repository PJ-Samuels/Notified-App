import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/login';
import App from './App';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Callback from './components/callback';
import UserDashboard from './components/user_dashboard';
import ArtistSearch from './components/artist_search';
import ArtistPage from './components/artist_page';
import Signup from './components/signup';
import UserNav from './components/user_nav';
import HomeNav from './home_nav';
import LandingPage from './components/landing_page';
import Discover from './components/discover';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><HomeNav/><App/></>} />
        <Route path = "/landing_page" element = {<><HomeNav/><LandingPage/></>}/>
        <Route path= "/signup" element = {<><HomeNav/><Signup/></>}/>
        <Route path ="/login" element = {<><HomeNav/><Login/></>}/>   
        <Route path ="/callback" element = {<Callback/>}/>   
        <Route path ="/discover" element = {<><UserNav/><Discover/></>}/>   
        <Route path = "/user_dashboard" element = {<><UserNav/><UserDashboard/></>}/> 
        <Route path = "/artist_search" element = {<><UserNav/><ArtistSearch/></>}/>
        <Route path = "/artist_page" element = {<><UserNav/><ArtistPage/></>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode> 
);

