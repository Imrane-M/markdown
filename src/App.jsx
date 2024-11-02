
import Blague from "./components/Blague/Blague";
import EvenementsHistoriques from "./components/EvenementsHistoriques/EvenementsHistoriques";
import MocktailDuJour from "./components/Mocktails";
import RecetteDuJour from "./components/Recettes";
import NavBar from "./components/NavBar/NavBar";
import TableauAvecImage from "./components/Tableau/Tableau";
import './App.css'

function App() {
  return (
    <div className="container">
      <NavBar/>
      <TableauAvecImage/>
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
