import Citation from "./components/Citation";
import Blague from "./components/Blague";
import EvenementsHistoriques from "./components/EvenementsHistoriques";
import MocktailDuJour from "./components/Mocktails";
import RecetteDuJour from "./components/Recettes";
import NavBar from "./components/NavBar/NavBar";
import TV from './components/TV'
import TableauAvecImage from "./components/Tableau/Tableau";
import './App.css'

function App() {
  return (
    <div className="container">
      <NavBar/>
      <p>-----------------------------------------------------------------------</p>
      <Citation/>
      <p>-----------------------------------------------------------------------</p>
      <TableauAvecImage/>
      <p>-----------------------------------------------------------------------</p>
      <TV/>
      <p>-----------------------------------------------------------------------</p>
      <Blague/>
      <p>-----------------------------------------------------------------------</p>
      <EvenementsHistoriques/>
      <p>-----------------------------------------------------------------------</p>
      <MocktailDuJour/>
      <p>-----------------------------------------------------------------------</p>
      <RecetteDuJour/>
      <p>-----------------------------------------------------------------------</p>
    </div>
  );
}

export default App;
