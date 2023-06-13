import './App.css';
import React, { useEffect, useState } from 'react';


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      fetch("http://localhost:5000/")
        .then((res) => res.json())
        .then((data) => setData(data));
  }, []);
  return (
    <div>
      <h1>Data from Express Server</h1>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

    </div>
  );
};

export default App;
