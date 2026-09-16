import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Placeholder } from "react-bootstrap";
import { toast } from 'sonner';
import FormularioPaciente from "../components/pacientes/FormularioPaciente";
import clientAxios from "../config/axios";

const DashboardRecepcion = () => {
    const [busquedaTurnos, setBusquedaTurnos] = useState("");
    const [busquedaPacientes, setBusquedaPacientes] = useState("");

    const [turnos, setTurnos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const obtenerDatosBackend = useCallback(async () => {
        try {
             await new Promise(resolve => setTimeout(resolve, 1000));
            const [resTurnos, resPacientes] = await Promise.all([
                clientAxios.get('/turnos'),
                clientAxios.get('/pacientes')
            ]);

            setTurnos(resTurnos.data?.data || (Array.isArray(resTurnos.data) ? resTurnos.data : []));
            setPacientes(resPacientes.data?.data || (Array.isArray(resPacientes.data) ? resPacientes.data : []));
        } catch (error) {
            console.error("Error al sincronizar datos:", error);
            toast.error("Error al conectar con el servidor.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        obtenerDatosBackend();
    }, [obtenerDatosBackend]);

    const handleMarcarAtendido = async (idTurno) => {
        try {
            await clientAxios.patch(`/turnos/${idTurno}`);
            setTurnos(prev => prev.map(t => (t._id || t.id) === idTurno ? { ...t, estado: "atendido" } : t));
            toast.success("Turno marcado como atendido correctamente.");
        } catch (error) {
            console.error("Error al actualizar estado:", error);
            toast.error("Error al conectar con el servidor.");
        }
    };

    const handleLlamarPaciente = (nombre) => toast.info(`🔔 Llamando a recepción al paciente: ${nombre}`);

    const turnosFiltrados = (turnos || []).filter((t) => {
        const term = busquedaTurnos.toLowerCase().trim();
        if (!term) return true;
        const nombre = (t.paciente?.nombre || t.paciente?.nombreCompleto || "").toLowerCase();
        const dni = (t.paciente?.dni || "").toString();
        return nombre.includes(term) || dni.includes(term);
    });

    const pacientesFiltrados = (pacientes || []).filter((p) => {
        const term = busquedaPacientes.toLowerCase().trim();
        if (!term) return true;
        const nombre = (p.nombre || p.nombreCompleto || "").toLowerCase();
        const dni = (p.dni || "").toString();
        return nombre.includes(term) || dni.includes(term);
    });

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Turnos del Día</h2>
            <Row className="mb-4">
                <Col md={6}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar Paciente en turnos (por nombre o DNI)..."
                        value={busquedaTurnos}
                        onChange={(e) => setBusquedaTurnos(e.target.value)}
                    />
                </Col>
            </Row>

            <Row className="mb-5">
                {isLoading ? (
                    [1, 2, 3].map((item) => (
                        <Col md={4} key={item} className="mb-3">
                            <Card className="shadow-sm border">
                                <Card.Body>
                                    <Placeholder as={Card.Title} animation="glow"><Placeholder xs={8} /></Placeholder>
                                    <Placeholder as="p" animation="glow" className="mt-2"><Placeholder xs={5} /></Placeholder>
                                    <Placeholder.Button variant="primary" xs={12} className="mt-2" disabled />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : turnosFiltrados.length === 0 ? (
                    <Col><p>No se encontraron turnos pendientes.</p></Col>
                ) : (
                    turnosFiltrados.map((turno) => {
                        const idTurno = turno._id || turno.id;
                        const nombrePaciente = turno.paciente?.nombre || turno.paciente?.nombreCompleto || "Sin Nombre";
                        const dniPaciente = turno.paciente?.dni || "Sin DNI";
                        const fechaObj = turno.fechaTurno ? new Date(turno.fechaTurno) : null;
                        const fechaTexto = fechaObj ? `${fechaObj.toLocaleDateString()} ${fechaObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Sin Fecha';
                        const esAtendido = turno.estado === 'atendido';

                        return (
                            <Col md={4} key={idTurno} className="mb-3">
                                <Card className="shadow-sm border text-center">
                                    <Card.Body className="d-flex flex-column align-items-center">
                                        <Card.Title className="fw-bold text-uppercase mb-1">{nombrePaciente}</Card.Title>
                                        <p className="text-muted small mb-2"><strong>DNI:</strong> {dniPaciente}</p>
                                        <Card className="p-2 my-2 bg-light border-0 w-100">
                                            <p className="mb-0 text-monospace small">{fechaTexto}</p>
                                        </Card>
                                        <div className="d-flex gap-2 mt-3 justify-content-center w-100">
                                            <Button 
                                                variant={esAtendido ? "secondary" : "success"}
                                                size="sm"
                                                onClick={() => handleMarcarAtendido(idTurno)}
                                                disabled={esAtendido}
                                            >
                                                {esAtendido ? 'Atendido ✓' : 'Atendido'}
                                            </Button>
                                            <Button 
                                                variant="primary" 
                                                size="sm"
                                                onClick={() => handleLlamarPaciente(nombrePaciente)}
                                            >
                                                Llamar
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                )}
            </Row>

            <div className="my-5">
                <FormularioPaciente onPacienteGuardado={obtenerDatosBackend} />
            </div>

            <h2 className="mt-5 mb-4">Pacientes Cargados</h2>
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Buscar paciente por nombre o DNI..."
                value={busquedaPacientes}
                onChange={(e) => setBusquedaPacientes(e.target.value)}
            />

            <Row className="mb-5">
                {pacientesFiltrados.length === 0 ? (
                    <Col><p>No se encontraron pacientes registrados.</p></Col>
                ) : (
                    pacientesFiltrados.map((paciente) => (
                        <Col md={4} key={paciente._id || paciente.id} className="mb-3">
                            <Card className="shadow-sm border">
                                <Card.Body>
                                    <Card.Title className="fw-bold">{paciente.nombre || paciente.nombreCompleto}</Card.Title>
                                    <p className="mb-1"><strong>DNI:</strong> {paciente.dni}</p>
                                    <p className="mb-1"><strong>Email:</strong> {paciente.email}</p>
                                    <p className="mb-0">
                                        <strong>Obra Social:</strong> {paciente.obraSocial?.nombre || paciente.obraSocial || "Particular"}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default DashboardRecepcion;