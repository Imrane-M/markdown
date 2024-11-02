import React, { useState, useEffect } from 'react';
import './Mocktails.css';  // Importez le fichier CSS ici

const MocktailDuJour = () => {
  const [mocktail, setMocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMocktails = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const result = await response.json();
        const mocktails = result.drinks;
        const randomMocktail = mocktails[Math.floor(Math.random() * mocktails.length)];
        setMocktail(randomMocktail);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMocktails();
  }, []);

  if (loading) return <p className="mocktail-loading">Chargement du mocktail du jour...</p>;
  if (error) return <p className="mocktail-error">Erreur : {error}</p>;
  if (!mocktail) return <p className="mocktail-error">Aucun mocktail trouvé.</p>;

  return (
    <div className="mocktail-container">
      <h2 className="mocktail-title">Mocktail du Jour</h2>
      <p className="mocktail-name"><strong>Nom :</strong> {mocktail.strDrink}</p>
      <img
        src={mocktail.strDrinkThumb}
        alt={mocktail.strDrink}
        className="mocktail-image"
      />
    </div>
  );
};

export default MocktailDuJour;
