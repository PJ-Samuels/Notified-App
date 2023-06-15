import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/login';
import App from './App';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Callback from './components/callback';
import UserDashboard from './components/user_dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path ="/login" element = {<Login/>}/>"   
        <Route path ="/callback" element = {<Callback/>}/>"   
        <Route path = "/user_dashboard" element = {<UserDashboard/>}/> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode> 
);

