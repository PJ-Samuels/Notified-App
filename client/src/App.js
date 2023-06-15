import './App.css';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const App = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetch("http://localhost:5000/")
        .then((res) => res.json())
        .then((data) => setData(data));
  }, []);

  const handleClick = () => {
    navigate('/login');
    console.log("button clicked")
  }

  return (
    <div>
      <h1>Notified Home page</h1>
      <button onClick = {handleClick}>Spotify Login</button><br></br>
      {data.map((item, index) => (
        <a key={index}>{item}</a>
      ))}
    </div>
  );
};

export default App;
