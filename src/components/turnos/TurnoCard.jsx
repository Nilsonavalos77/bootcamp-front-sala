import { Col, Card, Button } from "react-bootstrap";
import { toast } from "sonner";

const TurnoCard = ({ turno, onAtender, onLlamar }) => {
    const esAtendido = turno?.estado === "atendido";
    const nombrePaciente = turno?.paciente?.nombre || "Sin Nombre";

    const handleLlamar = () => {
        if (onLlamar) {
            onLlamar(nombrePaciente);
        } else {
            toast.info(`🔔 Llamando al paciente: ${nombrePaciente}`);
        }
    };

    return (
        <Col md={4} className="mb-3">
            <Card className={`shadow-sm border h-100 ${esAtendido ? "bg-light text-muted" : ""}`}>
                <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                        <Card.Title className={`fw-bold mb-2 ${esAtendido ? "text-secondary" : ""}`}>
                            {nombrePaciente}
                        </Card.Title>

                        <p className="mb-1">
                            <strong>DNI:</strong> {turno?.paciente?.dni || "Sin DNI"}
                        </p>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="w-50"
                            onClick={handleLlamar}
                            disabled={esAtendido}
                        >
                            Llamar
                        </Button>

                        <Button
                            variant={esAtendido ? "secondary" : "success"}
                            size="sm"
                            className="w-50"
                            onClick={() => onAtender(turno?._id || turno?.id)}
                            disabled={esAtendido}
                        >
                            {esAtendido ? "Atendido" : "Marcar Atendido"}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default TurnoCard;