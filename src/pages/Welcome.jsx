import React from "react";
import Blague from "../components/Blague/Blague";
import EvenementsHistoriques from "../components/EvenementsHistoriques/EvenementsHistoriques";
import MocktailDuJour from "../components/Mocktails/Mocktails";
import RecetteDuJour from "../components/Recette/Recettes";
import NavBar from "../components/NavBar/NavBar";
import TableauAvecImage from "../components/Tableau/Tableau";
import Dashboard from "../pages/Dashboard";

import "./Welcome.css";

function Welcome() {
  return (
      <div className="container">
        <NavBar />
        <main className="main">
          <section className="flex-composant">
            <TableauAvecImage/>
            <Blague/>
            <EvenementsHistoriques/>
          </section>
          <section>
            <Dashboard />
          </section>
          <section className="flex-composant2">
            <MocktailDuJour />
            <RecetteDuJour />
          </section>
        </main>
      </div>
  );
}

export default Welcome;

