import Citation from "./components/Citation";
import Blague from "./components/Blague";
import EvenementsHistoriques from "./components/EvenementsHistoriques";
import MocktailDuJour from "./components/Mocktails";
import RecetteDuJour from "./components/Recettes";

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>-----------------------------------------------------------------------</p>
      <Citation/>
      <p>-----------------------------------------------------------------------</p>
      <Blague/>
      <p>-----------------------------------------------------------------------</p>
      <EvenementsHistoriques/>
      <p>-----------------------------------------------------------------------</p>
      <MocktailDuJour/>
      <p>-----------------------------------------------------------------------</p>
      <RecetteDuJour/>
    </div>
  );
}

export default App;
