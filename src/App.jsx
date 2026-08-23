import { useState } from 'react';
import { Button, Container, Badge } from 'react-bootstrap';

function App() {
  const [estadoPaciente, setEstadoPaciente] = useState("Pendiente");

  const atender = () => {
    setEstadoPaciente("Atendido");
    console.log("Variable en memoria:", estadoPaciente);
  }

  return (
    <>
      <Container className="mt-5">
        <h2>Estado del turno: 
          <Badge bg={estadoPaciente === "Atendido" ? "success" : "warning"} className="ms-2">
            {estadoPaciente}
          </Badge>
        </h2>
        <Button onClick={atender} disabled={estadoPaciente === "Atendido"}>
          Llamar paciente
        </Button>
      </Container>
    </>
  )
}

export default App;