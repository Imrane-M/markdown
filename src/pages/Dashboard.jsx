import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Citation from "../components/Citation";
import Blague from "../components/Blague";
import EvenementsHistoriques from "../components/EvenementsHistoriques";
import MocktailDuJour from "../components/Mocktails";
import RecetteDuJour from "../components/Recettes";


function Dashboard() {
  const [markdowns, setMarkdowns] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate();

  // Charger les fichiers depuis le local storage
  // dans le component
  const loadMarkdowns = () => {
    const files = [];
    for (let i =0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      // Ignorer les fichiers temporaires
      if (key !== "currentFileID") {
        files.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setMarkdowns(files);
  }
  // Charge et renvoi le fichier selectionné vers l'éditeur
  const openMarkdown = (file) => {
    localStorage.setItem("currentFileID", file.id); // Sauvegarde temporaire de l'ID du fichier
    navigate("/editor");
  }

  // Suppression du fichier temporaire 
  // en cas de nouveau fichier
  const handleNewMarkdown = () => {
    localStorage.removeItem("currentFileID")
    navigate("/editor");
  }

  useEffect(() => {
    loadMarkdowns();
  }, [])

  // Filtre les fichiers en fonction du terme de recherche
  const filteredMarkdowns = markdowns.filter((file) =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
    <h2>My Dashboard</h2>
    <button type="button" onClick={handleNewMarkdown}>New Markdown</button>
    <input 
      type='text' 
      placeholder='Rechercher un markdown...'
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      />
    <ul>
      {filteredMarkdowns.length === 0 ? "No files here ..." :
      filteredMarkdowns.map((file, index) => (
        <li key={index} onClick={() => openMarkdown(file)}>
          {file.title}
          <br />
          <small>Créé le : {file.createdDate}</small>
          <br />
          <small>Dernière modification : {file.modifiedDate}</small>
          </li>
      ))}
    </ul>
    <p>-----------------------------------------------------------------------</p>
    <h2>Others Stuff</h2>
      <Citation/>
      <p>-----------------------------------------------------------------------</p>
      <Blague/>
      <p>-----------------------------------------------------------------------</p>
      <EvenementsHistoriques/>
      <p>-----------------------------------------------------------------------</p>
      <MocktailDuJour/>
      <p>-----------------------------------------------------------------------</p>
      <RecetteDuJour/>
    </>
  )
}

export default Dashboard