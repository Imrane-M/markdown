import React, { useState, useEffect } from 'react';

const Citation = () => {
  const [advice, setAdvice] = useState('');  // état pour stocker l'advice
  const [loading, setLoading] = useState(true);  // état de chargement
  const [error, setError] = useState(null);  // état pour les erreurs

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await fetch('https://api.adviceslip.com/advice');  // Exemple d'URL
        if (!response.ok) {
          throw new Error('Erreur dans la réponse');
        }
        const data = await response.json();  // Transformer la réponse en JSON
        setAdvice(data.slip.advice);  // Extraire le conseil depuis l'objet "slip"
      } catch (error) {
        setError(error.message);  // Gestion des erreurs
      } finally {
        setLoading(false);  // Fin du chargement
      }
    };

    fetchAdvice();  // Appel de l'API au montage du composant
  }, []);  // L'effet se déclenche au montage seulement

  if (loading) return <p>Chargement...</p>;  // Indicateur de chargement
  if (error) return <p>Erreur : {error}</p>;  // Affichage des erreurs

  return (
    <div>
      <p>{advice}</p>  {/* Affichage de la citation */}
    </div>
  );
};

export default Citation;
