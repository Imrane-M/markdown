import React, { useState, useEffect } from 'react';
import './EvenementsHistoriques.css';

const EvenementsHistoriques = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://history.muffinlabs.com/date');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const result = await response.json();
        const historicalEvents = result.data.Events.slice(0, 2);
        setEvents(historicalEvents);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Chargement des événements historiques...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className='event-containers'>
      <h4>Événements historiques du jour</h4>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.year} :</strong> {event.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvenementsHistoriques;
