import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Start from './start';
import Login from './components/login';
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import UserDashboard from './components/user_dashboard';
import ArtistSearch from './components/artist_search';
import ArtistPage from './components/artist_page';
import Signup from './components/signup';
import UserNav from './components/user_nav';
import HomeNav from './home_nav';
import LandingPage from './components/landing_page';
import Discover from './components/discover';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><HomeNav/><Start/></>} />
        <Route path = "/landing_page" element = {<><HomeNav/><LandingPage/></>}/>
        <Route path= "/signup" element = {<><HomeNav/><Signup/></>}/>
        <Route path ="/login" element = {<><HomeNav/><Login/></>}/>
        <Route path ="/discover" element = {<><UserNav/><Discover/></>}/>   
        <Route path = "/user_dashboard" element = {<><UserNav/><UserDashboard/></>}/> 
        <Route path = "/artist_search" element = {<><UserNav/><ArtistSearch/></>}/>
        <Route path = "/artist_page" element = {<><UserNav/><ArtistPage/></>}/>
      </Routes>
    </Router>
  )
}

export default App
