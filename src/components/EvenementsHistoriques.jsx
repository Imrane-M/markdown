import React, { useState, useEffect } from 'react';

const EvenementsHistoriques = () => {
  const [events, setEvents] = useState([]);  // état pour stocker les événements
  const [loading, setLoading] = useState(true);  // état de chargement
  const [error, setError] = useState(null);  // état pour les erreurs

  useEffect(() => {
    // Fonction pour récupérer les événements historiques
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://history.muffinlabs.com/date');  // Appel à l'API
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const result = await response.json();  // Conversion de la réponse en JSON
        // Limitation à 2 événements maximum pour l'affichage
        const historicalEvents = result.data.Events.slice(0, 2);
        setEvents(historicalEvents);  // Mise à jour des événements dans l'état
      } catch (error) {
        setError(error.message);  // Gestion des erreurs
      } finally {
        setLoading(false);  // Fin du chargement
      }
    };

    fetchEvents();  // Appel de l'API lors du montage du composant
  }, []);  // [] signifie que l'effet se déclenche au montage seulement

  if (loading) return <p>Chargement des événements historiques...</p>;  // Affichage du statut de chargement
  if (error) return <p>Erreur : {error}</p>;  // Affichage des erreurs

  return (
    <div>
      <h2>Événements historiques du jour</h2>
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
