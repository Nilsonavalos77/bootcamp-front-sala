import { useState, useEffect, useCallback } from "react";
import { Container, Badge, Row, Col, Card, Button } from "react-bootstrap";
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

    useEffect(() => {
        obtenerTurnos();
        obtenerPacientes();
    }, [obtenerTurnos, obtenerPacientes]);

    const turnosFiltrados = (turnos || []).filter((turno) => {
        const termino = busquedaTurnos.toLowerCase().trim();
        if (!termino) return true; 

        const nombrePaciente = (turno.paciente?.nombre || turno.paciente?.nombreCompleto || "").toLowerCase();
        return nombrePaciente.includes(termino);
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
                        placeholder="Buscar Paciente en turnos..."
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
                    turnosFiltrados.map((turno) => (
                        <Col md={4} key={turno._id || turno.id} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {turno.paciente?.nombre || turno.paciente?.nombreCompleto || "Sin Nombre"}
                                    </Card.Title>
                                    <h5>DNI: {turno.paciente?.dni}</h5>
                                    <Card className="p-2 my-2 bg-light">
                                        <h6>Especialidad: {turno.especialidad}</h6>
                                        <h6>Fecha: {turno.fechaTurno}</h6>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            <FormularioPaciente onPacienteGuardado={obtenerPacientes} />

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
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {paciente.nombre || paciente.nombreCompleto}
                                    </Card.Title>
                                    <p><strong>DNI:</strong> {paciente.dni}</p>
                                    <p><strong>Email:</strong> {paciente.email}</p>
                                    <p>
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