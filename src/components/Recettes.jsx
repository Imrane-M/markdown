import React, { useState, useEffect } from 'react';

const RecetteDuJour = () => {
  const [recipe, setRecipe] = useState(null);  // état pour stocker la recette
  const [loading, setLoading] = useState(true);  // état de chargement
  const [error, setError] = useState(null);  // état pour gérer les erreurs
  const [showDialog, setShowDialog] = useState(false);  // état pour contrôler l'affichage de la dialog

  useEffect(() => {
    // Fonction pour récupérer une recette aléatoire
    const fetchRecipe = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');  // Appel à l'API
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const result = await response.json();  // Conversion de la réponse en JSON
        setRecipe(result.meals[0]);  // Stocker la recette dans l'état
      } catch (error) {
        setError(error.message);  // Gestion des erreurs
      } finally {
        setLoading(false);  // Fin du chargement
      }
    };

    fetchRecipe();  // Appel de l'API au montage du composant
  }, []);  // [] signifie que l'effet se déclenche au montage seulement

  if (loading) return <p>Chargement de la recette du jour...</p>;  // Affichage du statut de chargement
  if (error) return <p>Erreur : {error}</p>;  // Affichage des erreurs
  if (!recipe) return <p>Aucune recette trouvée.</p>;  // Si aucune recette n'est trouvée

  // Fonction pour fermer ou ouvrir la dialog
  const toggleDialog = () => setShowDialog(!showDialog);

  return (
    <div>
      <h2>Recette du Jour</h2>
      <p><strong>Nom de la recette :</strong> {recipe.strMeal}</p>
      <button onClick={toggleDialog}>Voir les détails</button>  {/* Bouton pour afficher la dialog */}

      {/* Dialog affichant les détails de la recette */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3>{recipe.strMeal}</h3>
            <h4>Ingrédients :</h4>
            <ul>
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];
                return ingredient ? (
                  <li key={i}>{`${ingredient} - ${measure}`}</li>
                ) : null;
              })}
            </ul>
            <h4>Instructions :</h4>
            <p>{recipe.strInstructions}</p>
            <button onClick={toggleDialog}>Fermer</button>  {/* Bouton pour fermer la dialog */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecetteDuJour;
