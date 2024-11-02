import React, { useState, useEffect } from 'react';
import './Recettes.css';

const RecetteDuJour = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const result = await response.json();
        setRecipe(result.meals[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  if (loading) return <p className="loading">Chargement de la recette du jour...</p>;
  if (error) return <p className="error">Erreur : {error}</p>;
  if (!recipe) return <p className="no-recipe">Aucune recette trouvée.</p>;

  const toggleDialog = () => setShowDialog(!showDialog);

  return (
    <div className='recette-container'>
      <h2 className="title">Recette du Jour</h2>
      <p className="recipe-name"><strong>Nom de la recette :</strong> {recipe.strMeal}</p>
      <button onClick={toggleDialog} className="button">Voir les détails</button>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3 className="dialog-title">{recipe.strMeal}</h3>
            <h4 className="dialog-subtitle">Ingrédients :</h4>
            <ul className="ingredients-list">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];
                return ingredient ? (
                  <li key={i} className="ingredient-item">{`${ingredient} - ${measure}`}</li>
                ) : null;
              })}
            </ul>
            <h4 className="dialog-subtitle">Instructions :</h4>
            <p className="instructions">{recipe.strInstructions}</p>
            <button onClick={toggleDialog} className="button">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecetteDuJour;
