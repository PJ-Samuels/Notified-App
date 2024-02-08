'use client';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeNav from './home_nav';
import App from './App';
import Login from './login/page';
// import Callback from '../../../client/callback/callback';
import UserDashboard from './user_dashboard/page';
import ArtistSearch from './artist_search/page';
import ArtistPage from './artist_page/page';
import Signup from './signup/page';
import UserNav from './user_nav';
import LandingPage from './landing_page/page';
import Discover from './discover/page';
import './index.css';

const Home = () => (
  <>
    <HomeNav  />
    <App />
  </>

  // <React.StrictMode>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<><HomeNav/><App/></>} />
  //       <Route path="/landing_page" element={<><HomeNav/><LandingPage/></>} />
  //       <Route path="/signup" element={<><HomeNav/><Signup/></>} />
  //       <Route path="/login" element={<><HomeNav/><Login/></>} />
  //       <Route path="/callback" element={<Callback />} />
  //       <Route path="/discover" element={<><UserNav/><Discover/></>} />
  //       <Route path="/user_dashboard" element={<><UserNav/><UserDashboard/></>} />
  //       <Route path="/artist_search" element={<><UserNav/><ArtistSearch/></>} />
  //       <Route path="/artist_page" element={<><UserNav/><ArtistPage/></>} />
  //     </Routes>
  //   </BrowserRouter>
  // </React.StrictMode>
);

export default Home;
