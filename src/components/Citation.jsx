import React, { useState, useEffect } from 'react';

const Citation = () => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
          throw new Error('Erreur dans la réponse');
        }
        const data = await response.json();
        setAdvice(data.slip.advice);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <p>{advice}</p>
    </div>
  );
};

export default Citation;
