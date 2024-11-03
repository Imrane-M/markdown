import React, { useState, useEffect } from 'react';
import './Horloge.css';

const Horloge = () => {
  const [heure, setHeure] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeure(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="horloge-container">
      <h1 className="horloge-title">Heure actuelle :</h1>
      <p className="horloge-time">{heure}</p>
    </div>
  );
};

export default Horloge;
