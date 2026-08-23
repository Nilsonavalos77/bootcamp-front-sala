import { useState } from "react";
import { Container, Badge, Row, Col, Card, Button } from "react-bootstrap";

const turnosDelDia = [
    { id: 1, pacientes: "Tomas Gallardo", especialidad: "Cardiologia", estado: "pendiente"},
    { id: 2, pacientes: "Marina Lopez", especialidad: "Clinica Medica", estado: "pendiente"},
    { id: 3, pacientes: "Susana", especialidad: "Oftalmologia", estado: "pendiente"},
    { id: 4, pacientes: "Roque Gimenez", especialidad: "Pediatria", estado: "pendiente"},
    { id: 5, pacientes: "Ernesto Roura", especialidad: "Cardiologia", estado: "pendiente"},
    { id: 6, pacientes: "Juan Pared", especialidad: "Cardiologia", estado: "pendiente"},
    { id: 7, pacientes: "Marisol Nuñez", especialidad: "Cardiologia", estado: "pendiente"},
    { id: 8, pacientes: "Tomas Gallardo", especialidad: "Cardiologia", estado: "pendiente"},
    { id: 9, pacientes: "Marina Lopez", especialidad: "Clinica Medica", estado: "pendiente"},
    { id: 10, pacientes: "Susana", especialidad: "Oftalmologia", estado: "pendiente"},
    { id: 11, pacientes: "Roque Gimenez", especialidad: "Pediatria", estado: "pendiente"},
    { id: 12, pacientes: "Ernesto Roura", especialidad: "Cardiologia", estado: "pendiente"},
    { id: 13, pacientes: "Juan Pared", especialidad: "Cardiologia", estado: "pendiente"},
    { id: 14, pacientes: "Marisol Nuñez", especialidad: "Cardiologia", estado: "pendiente"}
];

const DashboardRecepcion = () => {
    const [busqueda, setBusqueda] = useState("");
    const [turnos, setTurnos] = useState(turnosDelDia);

    const turnosFiltrados = turnos.filter(turno =>
        turno.pacientes.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
    );

    const marcarComoAtendido = (idTurno) => {
        const turnosActualizados = turnos.map(turno => {
            if (turno.id === idTurno) return { ...turno, estado: "Atendido"};
            return turno;
        });
        setTurnos(turnosActualizados);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Turnos del Día</h2>
            <Row className="mb-4">
                <Col md={6}>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Buscar Paciente..."
                        value={busqueda}
                        onChange={(evento) => setBusqueda(evento.target.value)}
                    />
                </Col>    
            </Row>

            <Row>
                {turnosFiltrados.map((turno) => (
                    <Col md={4} key={turno.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{turno.pacientes}</Card.Title>
                                <h5 className="mt-3">
                                    {turno.estado === 'Atendido' 
                                        ? <Badge bg="success">Atendido</Badge> 
                                        : <Badge bg="warning" text="dark"> En Espera</Badge>
                                    }
                                </h5>
                                <Button onClick={() => marcarComoAtendido(turno.id)} disabled={turno.estado === 'Atendido'}>Llamar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DashboardRecepcion;