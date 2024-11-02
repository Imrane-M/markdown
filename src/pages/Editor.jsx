import { useState, useEffect, useRef} from 'react'
import Showdown from 'showdown';

import './Editor.css'

function Editor() {
  const previewRef = useRef(null);
  const [title, setTitle] = useState('Mon markdown <3')
  const [markdown, setMarkdown] = useState('');
  const [markdownID, setMarkdownID] = useState('')
  // Création d'une instance de fichier markdown avec prévisualisation
  const showdown = new Showdown.Converter();
  // Gestion de la prévisualisation
  const handleChangeMarkdown = (e) => {
    if (previewRef.current) {
      setMarkdown(e.target.value);
      previewRef.current.innerHTML = showdown.makeHtml(e.target.value);
    }
  }
  // Gestion de la modidfication du titre
  const handleChangeTitle = () => {
    const newTitle = prompt('Entrez le titre du document', title);
    if (newTitle === '') return;
    newTitle !== null && setTitle(newTitle);
  }
  // Gestion de la sauvegarde dans le local storage
  const handleSave = () => {
    if (!title) alert("Veuillez donner un titre à votre fichier.");
    const existingFile = JSON.parse(localStorage.getItem(markdownID));
    const now = new Date().toLocaleString(); // Date actuelle sous forme lisible
    // Structure de données avec date de création et de dernière modification
    const fileData = {
      id: markdownID ?? crypto.randomUUID(),
      title,
      markdown,
      createdDate: existingFile ? existingFile.createdDate : now, // Date de création uniquement si c'est une première sauvegarde
      modifiedDate: now // Met à jour à chaque sauvegarde
    };
    localStorage.setItem(fileData.id, JSON.stringify(fileData));
    alert("Fichier sauvegardé avec succès !");
  }
  // Gestion des imports d'un fichier markdown
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setMarkdown(event.target.result); // Mettre à jour le contenu du markdown
      setTitle(file.name); // Mettre à jour le titre du fichier
    };
    reader.readAsText(file);
  }
  // Gestion des exports du fichier markdown
  const handleExport = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    // Créer un lien temporaire pour télécharger le fichier
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Chargement du fichier temporaire si disponible
  useEffect(() => {
    const tempFileID = localStorage.getItem("currentFileID") // On reccupère l'ID du markdown séclectionné
    // On charge le contenu dans les states
    const tempFile = JSON.parse(
      localStorage.getItem(tempFileID)) 
      ?? {title: 'unknown_markdown', markdown:''};
    setTitle(tempFile.title);
    setMarkdown(tempFile.markdown);
    setMarkdownID(tempFile.id)
  }, []);

  return (
    <div className="container">
      <div className="header--wrapper">
        <h2>My Editor</h2>
        <div className="title--wrapper">
          <div>{title}</div>
          <label htmlFor="changeTitle"></label>
          <button onClick={handleChangeTitle} id="changeTitle">...</button>
        </div>
        <div className="menu">
          <button type="button" onClick={handleSave}>Save</button>          
          <button type="button" onClick={handleExport}>Download</button>

          <label htmlFor="import">Upload file</label>
          <input type="file" accept=".md" onChange={handleFileImport} />
        </div>
      </div>

      <div className="editor--wrapper">
        <textarea name="editor" id="textEditor" 
        className="editor" onInput={handleChangeMarkdown} 
        spellCheck={false} value={markdown}
        placeholder="Laissez votre empreinte...">
        </textarea>
        <div className="preview" ref={previewRef}></div>
      </div>
    </div>
)}
export default Editor