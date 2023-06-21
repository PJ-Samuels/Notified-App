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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path ="/login" element = {<Login/>}/>"   
        <Route path ="/callback" element = {<Callback/>}/>"   
        <Route path = "/user_dashboard" element = {<UserDashboard/>}/> 
        <Route path = "/artist_search" element = {<ArtistSearch/>}/>
        <Route path = "/artist_page" element = {<ArtistPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode> 
);

