import Header from "./components/Header";
import PacienteCard from "./components/PacienteCard";

import "./App.css";

function App() {
  return (
    <>
      <Header />

      <PacienteCard
        nombre="Juan Perez"
        obraSocial="OSDE"
        dni="12345678"
      />

      <PacienteCard
        nombre="Maria Lopez"
        dni="87654321"
      />
    </>
  );
}

export default App;