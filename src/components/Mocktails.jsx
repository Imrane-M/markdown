import React, { useState, useEffect } from 'react';

const MocktailDuJour = () => {
  const [mocktail, setMocktail] = useState(null);  // état pour stocker le mocktail sélectionné
  const [loading, setLoading] = useState(true);  // état de chargement
  const [error, setError] = useState(null);  // état pour gérer les erreurs

  useEffect(() => {
    // Fonction pour récupérer tous les mocktails
    const fetchMocktails = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');  // Appel à l'API
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const result = await response.json();  // Conversion de la réponse en JSON
        const mocktails = result.drinks;  // Extraction de la liste des mocktails
        const randomMocktail = mocktails[Math.floor(Math.random() * mocktails.length)];  // Sélection aléatoire
        setMocktail(randomMocktail);  // Mise à jour de l'état avec le mocktail sélectionné
      } catch (error) {
        setError(error.message);  // Gestion des erreurs
      } finally {
        setLoading(false);  // Fin du chargement
      }
    };

    fetchMocktails();  // Appel de l'API au montage du composant
  }, []);  // [] signifie que l'effet se déclenche au montage seulement

  if (loading) return <p>Chargement du mocktail du jour...</p>;  // Affichage du statut de chargement
  if (error) return <p>Erreur : {error}</p>;  // Affichage des erreurs
  if (!mocktail) return <p>Aucun mocktail trouvé.</p>;  // Si aucun mocktail n'est trouvé

  return (
    <div>
      <h2>Mocktail du Jour</h2>
      <p><strong>Nom :</strong> {mocktail.strDrink}</p>  {/* Afficher le nom du mocktail */}
      <img src={mocktail.strDrinkThumb} alt={mocktail.strDrink} style={{ width: '200px' }} />  {/* Afficher l'image */}
    </div>
  );
};

export default MocktailDuJour;
