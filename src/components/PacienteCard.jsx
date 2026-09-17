import { Button, Card } from "react-bootstrap";

const PacienteCard = ({
  nombre,
  obraSocial = "particular",
  dni,
  especialidad,
  fechaTurno,
  observaciones,
  estado,
  onAtender,
  onLlamar,
  variant = "primary",
}) => {
  // Formatear la fecha si existe
  const fechaFormateada = fechaTurno
    ? `${new Date(fechaTurno).toLocaleDateString()} ${new Date(
        fechaTurno
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    : null;

  return (
    <Card className="p-3 mb-3 shadow-sm text-center" style={{ maxWidth: "300px" }}>
      <h3 className="fw-bold text-uppercase">{nombre}</h3>
      <p className="fs-5 mb-1">{dni}</p>
      {obraSocial && <p className="text-muted small">Obra Social: {obraSocial}</p>}

      <div className="bg-light p-2 rounded my-2 border">
        {especialidad && <p className="mb-1 fw-semibold text-capitalize">{especialidad}</p>}
        {fechaFormateada && <p className="mb-1 text-monospace small">{fechaFormateada}</p>}
        {observaciones && <p className="mb-0 text-secondary small">{observaciones}</p>}
      </div>

      {estado && (
        <div className="mb-2">
          <span className={`badge ${estado === "atendido" ? "bg-success" : "bg-warning text-dark"}`}>
            {estado}
          </span>
        </div>
      )}

      <div className="d-flex flex-column gap-2 mt-2">
        {onAtender && (
          <Button variant="success" size="sm" onClick={onAtender}>
            Atendido
          </Button>
        )}
        {onLlamar && (
          <Button variant="primary" size="sm" onClick={onLlamar}>
            Llamar
          </Button>
        )}
        {!onAtender && !onLlamar && (
          <Button variant={variant} size="sm">
            Ver historia clínica
          </Button>
        )}
      </div>
    </Card>
  );
};

export default PacienteCard;