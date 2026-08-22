import { Button, Card } from "react-bootstrap";

const PacienteCard = ({
  nombre,
  obraSocial = "particular",
  dni,
  variant = "primary",
}) => {
  return (
    <Card>
      <h2>Nombre: {nombre}</h2>
      <p>Obra Social: {obraSocial}</p>
      <p>DNI: {dni}</p>

      <Button variant={variant}>
        Ver historia clínica
      </Button>
    </Card>
  );
};

export default PacienteCard;