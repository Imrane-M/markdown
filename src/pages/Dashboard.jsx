import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [markdowns, setMarkdowns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Charger les fichiers depuis le local storage
  const loadMarkdowns = () => {
    const files = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      // Ignorer les fichiers temporaires
      if (key !== "currentFileID") {
        const file = JSON.parse(localStorage.getItem(key));
        if (file) { // Vérifiez si le fichier existe avant de l'ajouter
          files.push(file);
        }
      }
    }
    setMarkdowns(files);
  };

  // Charge et renvoie le fichier sélectionné vers l'éditeur
  const openMarkdown = (file) => {
    localStorage.setItem("currentFileID", file.id); // Sauvegarde temporaire de l'ID du fichier
    navigate("/editor");
  };

  // Suppression du fichier temporaire en cas de nouveau fichier
  const handleNewMarkdown = () => {
    localStorage.removeItem("currentFileID");
    navigate("/editor");
  };

  useEffect(() => {
    loadMarkdowns();
  }, []);

  // Filtre les fichiers en fonction du terme de recherche
  const filteredMarkdowns = markdowns.filter((file) =>
    file.title && file.title.toLowerCase().includes(searchTerm.toLowerCase()) // Vérifiez si title existe
  );

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">My Dashboard</h2>
      <button type="button" className="new-markdown-button" onClick={handleNewMarkdown}>Nouveau Markdown</button>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Rechercher un markdown..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="markdown-list">
        {filteredMarkdowns.length === 0 ? (
          <p className="no-files-message">No files here ...</p>
        ) : (
          filteredMarkdowns.map((file, index) => (
            <li key={index} className="markdown-item" onClick={() => openMarkdown(file)}>
              <p className="file-title">{file.title}</p>
              <small className="file-created-date">Créé le : {file.createdDate}</small>
              <small className="file-modified-date">Dernière modification : {file.modifiedDate}</small>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Dashboard;
