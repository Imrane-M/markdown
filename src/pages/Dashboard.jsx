import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Citation from "../components/Citation";
import Blague from "../components/Blague";
import EvenementsHistoriques from "../components/EvenementsHistoriques";
import MocktailDuJour from "../components/Mocktails";
import RecetteDuJour from "../components/Recettes";


function Dashboard() {
  const [markdowns, setMarkdowns] = useState([])
  const navigate = useNavigate();

  // Charger les fichiers depuis le local storage
  const loadMarkdowns = () => {
    const files = [];
    for (let i =0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      // Ignorer les fichiers temporaires
      if (key !== "currentFileTitle" && key !== "currentFileContent") {
        files.push({ title: key, content: localStorage.getItem(key) });
      }
    }
    setMarkdowns(files);
  }
  // Charger un fichier dans l'éditeur
  const openMarkdown = (file) => {
    localStorage.setItem("currentFileTitle", file.title); // Sauvegarde temporaire du titre
    localStorage.setItem("currentFileContent", file.content); // Sauvegarde temporaire du contenu
    navigate("/editor");
  }

  // Suppression du fichier temporaire 
  // en cas de nouveau fichier
  const handleNewMarkdown = () => {
    localStorage.removeItem("currentFileTitle")
    localStorage.removeItem("currentFileContent")      
    navigate("/editor");
  }

  useEffect(() => {
    loadMarkdowns();
  }, [])
  return (
    <>
    <h2>My Dashboard</h2>
    <button type="button" onClick={handleNewMarkdown}>New Markdown</button>
    <ul>
      {markdowns.length === 0 ? "No files here ..." :
      markdowns.map((file, index) => (
        <li key={index} onClick={() => openMarkdown(file)}>
          {file.title}
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