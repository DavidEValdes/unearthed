import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Gifts from './pages/Gifts';
import GiftDetails from './pages/GiftDetails';
import PageNotFound from './pages/PageNotFound';
import { Link } from 'react-router-dom';

const App = () => {
  const [gifts, setGifts] = useState([]);

  
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await fetch('http://localhost:3001/gifts'); 
        const data = await response.json();
        setGifts(data); // Set the fetched data to gifts state
      } catch (error) {
        console.error('Error fetching gifts:', error);
      }
    };

    fetchGifts(); 
  }, []); 

  // Sets up routes
  let element = useRoutes([
    {
      path: '/',
      element: <Gifts data={gifts} />, // Pass gifts data to Gifts component
    },
    {
      path: '/gift/:id',
      element: <GiftDetails data={gifts} />, // Pass gifts data to GiftDetails
    },
    {
      path: '/*',
      element: <PageNotFound />,
    },
  ]);

  return (
    <div className="App">
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src="/logo.png" alt="Logo" />
            <h1>UnEarthed</h1>
          </div>
          <div className="header-right">
            <Link to="/">
              <button className="homeBtn">Home</button>
            </Link>
          </div>
        </div>
      </header>

      {element}
    </div>
  );
};

export default App;