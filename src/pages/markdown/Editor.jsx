import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Showdown from 'showdown';

import './Editor.css';

function Editor() {
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const [title, setTitle] = useState('Mon markdown <3');
  const [markdown, setMarkdown] = useState('');
  const [markdownID, setMarkdownID] = useState('');
  const showdown = new Showdown.Converter();

  const handleChangeMarkdown = (e) => {
    if (previewRef.current) {
      setMarkdown(e.target.value);
      previewRef.current.innerHTML = showdown.makeHtml(e.target.value);
    }
  };

  const handleChangeTitle = () => {
    const newTitle = prompt('Entrez le titre du document', title);
    if (newTitle === '') return;
    newTitle !== null && setTitle(newTitle);
  };

  const handleSave = () => {
    if (!title) alert("Veuillez donner un titre à votre fichier.");
    const existingFile = JSON.parse(localStorage.getItem(markdownID));
    const now = new Date().toLocaleString();
    const fileData = {
      id: markdownID ?? crypto.randomUUID(),
      title,
      markdown,
      createdDate: existingFile ? existingFile.createdDate : now,
      modifiedDate: now,
    };
    localStorage.setItem(fileData.id, JSON.stringify(fileData));
    alert("Fichier sauvegardé avec succès !");
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'text/markdown') {
      alert("Veuillez sélectionner un fichier Markdown (.md)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setMarkdown(event.target.result);
      setTitle(file.name);
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const applyFormat = (formatType) => {
    const textarea = document.getElementById('textEditor');
    const { selectionStart, selectionEnd, value } = textarea;
    const selectedText = value.slice(selectionStart, selectionEnd);

    let formattedText;
    switch (formatType) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'titre-1':
        formattedText = `# ${selectedText}`;
        break;
      case 'titre-2':
        formattedText = `## ${selectedText}`;
        break;
      case 'titre-3':
        formattedText = `### ${selectedText}`;
        break;
      default:
        return;
    }

    const newText = value.slice(0, selectionStart) + formattedText + value.slice(selectionEnd);
    setMarkdown(newText);

    // Réinitialiser le curseur à la fin du texte formaté
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionStart + formattedText.length, selectionStart + formattedText.length);
    }, 0);
  };

  useEffect(() => {
    const tempFileID = localStorage.getItem("currentFileID");
    const tempFile = JSON.parse(localStorage.getItem(tempFileID)) ?? { title: 'unknown_markdown', markdown: '' };
    setTitle(tempFile.title);
    setMarkdown(tempFile.markdown);
    setMarkdownID(tempFile.id);
  }, []);

  useEffect(() => {
    const autoSave = setInterval(handleSave, 2 * 60 * 1000);
    return () => clearInterval(autoSave);
  }, [markdown, title]);

  return (
   <div>
    <div className="editor-container">
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
          <input type="file" accept=".md" id="import" onChange={handleFileImport} />
        </div>
      </div>

      <div className='formating'>
        <button onClick={() => applyFormat('titre-1')}>H1</button>
        <button onClick={() => applyFormat('titre-2')}>H2</button>
        <button onClick={() => applyFormat('titre-3')}>H3</button>
        <button onClick={() => applyFormat('bold')}>Gras</button>
        <button onClick={() => applyFormat('italic')}>Italique</button>
        <button onClick={() => applyFormat('link')}>Lien</button>
      </div>

      <div className="editor--wrapper">
        <textarea
          name="editor"
          id="textEditor"
          className="editor"
          onInput={handleChangeMarkdown}
          spellCheck={false}
          value={markdown}
          placeholder="Laissez votre empreinte..."
        />
        <div className="preview" ref={previewRef}></div>
      </div>
    </div>
    <button onClick={() => navigate('/')} className="back-button">
        Retourner à la page d'accueil
      </button>
    </div>
  );
}

export default Editor;
