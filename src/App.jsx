import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Editor from "./pages/Editor";
import Blague from "./components/Blague/Blague";
import EvenementsHistoriques from "./components/EvenementsHistoriques/EvenementsHistoriques";
import MocktailDuJour from "./components/Mocktails";
import RecetteDuJour from "./components/Recettes";
import NavBar from "./components/NavBar/NavBar";
import TableauAvecImage from "./components/Tableau/Tableau";
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <nav>
        <Link to="/">Dashboard</Link>
        <br />
        <Link to="/editor">Editor</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
      <div className="container">
        <TableauAvecImage />
        <p>-----------------------------------------------------------------------</p>
        <Blague />
        <p>-----------------------------------------------------------------------</p>
        <EvenementsHistoriques />
        <p>-----------------------------------------------------------------------</p>
        <MocktailDuJour />
        <p>-----------------------------------------------------------------------</p>
        <RecetteDuJour />
        <p>-----------------------------------------------------------------------</p>
      </div>
    </Router>
  );
}

export default App;
