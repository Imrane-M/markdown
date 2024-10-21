import React, { useState, useEffect } from 'react';

const Blague = () => {
  const [data, setData] = useState(null);  // état pour stocker les données
  const [loading, setLoading] = useState(true);  // état pour gérer le chargement
  const [error, setError] = useState(null);  // état pour gérer les erreurs

  useEffect(() => {
    // Fonction pour effectuer la requête GET
    const fetchData = async () => {
      try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');  // URL de l'API
        if (!response.ok) {
          throw new Error('Erreur dans la réponse');
        }
        const result = await response.json();  // Conversion de la réponse en JSON
        setData(result);  // Mise à jour des données dans l'état
      } catch (error) {
        setError(error.message);  // Gestion des erreurs
      } finally {
        setLoading(false);  // Arrêter le chargement une fois la requête terminée
      }
    };

    fetchData();  // Appel de la fonction fetchData au montage du composant
  }, []);  // [] signifie que l'effet se déclenche seulement au montage du composant

  if (loading) return <p>Chargement...</p>;  // Affichage du statut de chargement
  if (error) return <p>Erreur: {error}</p>;  // Affichage des erreurs
  if (!data) return <p>Aucune blague trouvée.</p>;  // Si les données sont nulles

  return (
    <div>
        
      <h2>Blague du Jour:</h2>
      <p><strong>Question :</strong> {data.setup}</p>  {/* Afficher "setup" */}
      <p><strong>Réponse :</strong> {data.punchline}</p>  {/* Afficher "punchline" */}
    </div>
  );
};

export default Blague;
