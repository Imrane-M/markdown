import React, { useState, useEffect } from 'react';
import './Blague.css';

const Blague = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!response.ok) {
          throw new Error('Erreur dans la réponse');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  if (!data) return <p>Aucune blague trouvée.</p>;

  return (
    <div className="blague-container">
      <h2 className="blague-title">Blague du Jour:</h2>
      <p className="blague-setup"><strong>Question :</strong> {data.setup}</p>
      <p className="blague-punchline"><strong>Réponse :</strong> {data.punchline}</p>
    </div>
  );
};

export default Blague;
