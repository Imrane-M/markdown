import React from "react";
import Blague from "../components/Blague/Blague";
import EvenementsHistoriques from "../components/EvenementsHistoriques/EvenementsHistoriques";
import MocktailDuJour from "../components/Mocktails/Mocktails";
import RecetteDuJour from "../components/Recette/Recettes";
import NavBar from "../components/NavBar/NavBar";
import TableauAvecImage from "../components/Tableau/Tableau";
import Dashboard from "../pages/Dashboard";
import Horloge from "../components/Horloge/Horloge";

import "./Welcome.css";

function Welcome() {
  return (
      <div className="container">
        <NavBar />
        <div className="main">
          <div className="flex-composant">
            <TableauAvecImage/>
            <Blague/>
            <EvenementsHistoriques/>
          </div>
          <div>
            <Dashboard />
          </div>
          <div className="flex-composant2">
            <Horloge/>
            <MocktailDuJour />
            <RecetteDuJour />
          </div>
        </div>
      </div>
  );
}

export default Welcome;

