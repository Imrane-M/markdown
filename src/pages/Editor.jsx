import React, { useState, useRef} from 'react'
import Showdown from 'showdown';

import './Editor.css'

function Editor() {
  const previewRef = useRef(null);
  const [title, setTitle] = useState('Mon markdown <3')
  const [markdown, setMarkdown] = useState('');

  const showdown = new Showdown.Converter();
  
  const handleChangeMarkdown = (e) => {
    if (previewRef.current) {
      setMarkdown(e.target.value);
      previewRef.current.innerHTML = showdown.makeHtml(e.target.value);
    }
  }
  const handleChangeTitle = () => {
    const newTitle = prompt('Entrez le titre du document', '');
    if (newTitle === '') return;
    newTitle !== null && setTitle(newTitle);
  }
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setMarkdown(event.target.result); // Mettre à jour le contenu du markdown
      setTitle(file.name); // Mettre à jour le titre du fichier
    };
    reader.readAsText(file);
  }
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

  return (
    <div className="container">
      <div className="header--wrapper">
        <div className="title--wrapper">
          <div>{title}</div>
          <label htmlFor="changeTitle"></label>
          <button onClick={handleChangeTitle} id="changeTitle">...</button>
        </div>
        <div className="menu">
          <label htmlFor="saveButton" aria-label="Enregistrer le fichier">Enregistrer les modifications</label>
          <button type="button" onClick={handleExport}>Exporter</button>

          <label htmlFor="import">Importer un fichier</label>
          <input type="file" accept=".md" onChange={handleFileImport} />
        </div>
      </div>

      <div className="editor--wrapper">
        <textarea name="editor" id="textEditor" 
        className="editor" onChange={handleChangeMarkdown} 
        spellCheck={false} value={markdown}
        placeholder="Laissez votre empreinte...">
        </textarea>
        <div className="preview"ref={previewRef}></div>
      </div>
    </div>
)}
export default Editor