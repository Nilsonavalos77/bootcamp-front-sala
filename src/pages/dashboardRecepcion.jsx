import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import FormularioPaciente from "../components/pacientes/FormularioPaciente";
import clientAxios from "../config/axios";

const DashboardRecepcion = () => {
    const [busquedaTurnos, setBusquedaTurnos] = useState("");
    const [busquedaPacientes, setBusquedaPacientes] = useState("");

    const [turnos, setTurnos] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    const obtenerTurnos = useCallback(async () => {
        try {
            const respuesta = await clientAxios.get("/turnos");
            const datos = respuesta.data?.data || (Array.isArray(respuesta.data) ? respuesta.data : []);
            setTurnos(datos);
        } catch (error) {
            console.error("Error al obtener turnos:", error);
            setTurnos([]);
        }
    }, []);

    const obtenerPacientes = useCallback(async () => {
        try {
            const respuesta = await clientAxios.get("/pacientes");
            const datos = respuesta.data?.data || (Array.isArray(respuesta.data) ? respuesta.data : []);
            setPacientes(datos);
        } catch (error) {
            console.error("Error al obtener pacientes:", error);
            setPacientes([]);
        }
    }, []);

    const recargarDatos = useCallback(() => {
        obtenerTurnos();
        obtenerPacientes();
    }, [obtenerTurnos, obtenerPacientes]);

    useEffect(() => {
        recargarDatos();
    }, [recargarDatos]);

    const handleMarcarAtendido = async (idTurno) => {
        try {
            await clientAxios.patch(`/turnos/${idTurno}`);
            await obtenerTurnos();
        } catch (error) {
            console.error("Error al marcar como atendido:", error);
        }
    };

    const handleLlamarPaciente = (nombrePaciente) => {
        alert(`🔔 Llamando a recepción al paciente: ${nombrePaciente}`);
    };

    const turnosFiltrados = (turnos || []).filter((turno) => {
        const termino = busquedaTurnos.toLowerCase().trim();
        if (!termino) return true; 

        const nombrePaciente = (turno.paciente?.nombre || turno.paciente?.nombreCompleto || "").toLowerCase();
        const dniPaciente = (turno.paciente?.dni || "").toString();

        return nombrePaciente.includes(termino) || dniPaciente.includes(termino);
    });

    const pacientesFiltrados = (pacientes || []).filter((paciente) => {
        const termino = busquedaPacientes.toLowerCase().trim();
        if (!termino) return true; 

        const nombre = (paciente.nombre || paciente.nombreCompleto || "").toLowerCase();
        const dni = (paciente.dni || "").toString();

        return nombre.includes(termino) || dni.includes(termino);
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

            <Row>
                {turnosFiltrados.length === 0 ? (
                    <Col>
                        <p>No hay turnos registrados o no coinciden con la búsqueda.</p>
                    </Col>
                ) : (
                    turnosFiltrados.map((turno) => {
                        const idTurno = turno._id || turno.id;
                        const nombrePaciente = turno.paciente?.nombre || turno.paciente?.nombreCompleto || "Sin Nombre";
                        
                        const fechaObj = turno.fechaTurno ? new Date(turno.fechaTurno) : null;
                        const fechaTexto = fechaObj 
                            ? `${fechaObj.toLocaleDateString()} ${fechaObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
                            : 'Sin Fecha';

                        const esAtendido = turno.estado === 'atendido';

                        return (
                            <Col md={4} key={idTurno} className="mb-3">
                                <Card className="shadow-sm border text-center">
                                    <Card.Body className="d-flex flex-column align-items-center">
                                        <Card.Title className="fw-bold text-uppercase mb-1">
                                            {nombrePaciente}
                                        </Card.Title>
                                        <h5 className="text-dark mb-3">{turno.paciente?.dni || "Sin DNI"}</h5>

                                        <Card className="p-2 my-2 bg-light border-0 w-100">
                                            <p className="mb-0 text-monospace small">
                                                {fechaTexto}
                                            </p>
                                        </Card>

                                        <div className="d-flex flex-column gap-2 mt-3 align-items-center w-100">
                                            <Button 
                                                variant={esAtendido ? "secondary" : "success"}
                                                size="sm"
                                                className="px-4"
                                                onClick={() => handleMarcarAtendido(idTurno)}
                                                disabled={esAtendido}
                                            >
                                                {esAtendido ? 'Atendido ✓' : 'Atendido'}
                                            </Button>

                                            <Button 
                                                variant="primary" 
                                                size="sm"
                                                className="px-4"
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

            <FormularioPaciente onPacienteGuardado={recargarDatos} />

            <h2 className="mt-5 mb-4">Pacientes Cargados</h2>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Buscar paciente por nombre o DNI..."
                value={busquedaPacientes}
                onChange={(e) => setBusquedaPacientes(e.target.value)}
            />

            <Row>
                {pacientesFiltrados.length === 0 ? (
                    <Col>
                        <p>No se encontraron pacientes registrados.</p>
                    </Col>
                ) : (
                    pacientesFiltrados.map((paciente) => (
                        <Col md={4} key={paciente._id || paciente.id} className="mb-3">
                            <Card className="shadow-sm border">
                                <Card.Body>
                                    <Card.Title className="fw-bold">
                                        {paciente.nombre || paciente.nombreCompleto}
                                    </Card.Title>
                                    <p className="mb-1"><strong>DNI:</strong> {paciente.dni}</p>
                                    <p className="mb-1"><strong>Email:</strong> {paciente.email}</p>
                                    <p className="mb-0">
                                        <strong>Obra Social:</strong>{" "}
                                        {paciente.obraSocial?.nombre || paciente.obraSocial || "Particular"}
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