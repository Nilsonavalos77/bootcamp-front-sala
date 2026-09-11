import { useState, useEffect } from "react";

import { Container, Badge, Row, Col, Card, Button } from "react-bootstrap";

import FormularioPaciente from "../components/pacientes/FormularioPaciente";

import clientAxios from "../config/axios";


const DashboardRecepcion = () => {

    const [busqueda, setBusqueda] = useState("");

    const [turnos, setTurnos] = useState([]);

    const [pacientes, setPacientes] = useState([]);

    const [busquedaPaciente, setBusquedaPaciente] = useState("");

    const turnosFiltrados = turnos.filter((turno) =>
        turno.paciente?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(busquedaPaciente.toLowerCase()) ||
    paciente.dni.includes(busquedaPaciente)
);


    useEffect(() => {

        const obtenerTurnos = async () => {

            try {

                const respuesta = await clientAxios.get("/turnos");

                setTurnos(respuesta.data.data);

                console.log(respuesta.data);

            } catch (error) {

                console.error("Error al obtener turnos:", error);

            }

        };

        obtenerTurnos();

    }, []);

useEffect(() => {
    const obtenerPacientes = async () => {
        try {
            const respuesta = await clientAxios.get("/pacientes");
            setPacientes(respuesta.data.data);
            console.log("Pacientes:", respuesta.data);
        } catch (error) {
            console.error("Error al obtener pacientes:", error);
        }
    };

    obtenerPacientes();
}, []);


    const marcarComoAtendido = (idTurno) => {

        const turnosActualizados = turnos.map((turno) => {

            if (turno.id === idTurno) {

                return {
                    ...turno,
                    estado: "Atendido"
                };

            }

            return turno;

        });

        setTurnos(turnosActualizados);

    };

    return (

        <Container className="mt-4">

            {/* TURNOS ARRIBA */}

            <h2 className="mb-4">Turnos del Día</h2>

            <Row className="mb-4">

                <Col md={6}>

                    <input

                        type="text"

                        className="form-control"

                        placeholder="Buscar Paciente..."

                        value={busqueda}

                        onChange={(evento) =>
                            setBusqueda(evento.target.value)
                        }

                    />

                </Col>

            </Row>

            <Row>

                {turnos && turnos.length === 0 ? (

                    <Col>

                        <p>cargando turnos...</p>

                    </Col>

                ) : (

                    turnosFiltrados.map((turno) => (

                        <Col
                            md={4}
                            key={turno.id}
                            className="mb-3"
                        >

                            <Card>

                                <Card.Body>

                                    <Card.Title>

                                        {turno.paciente?.nombre}

                                    </Card.Title>

                                    <h5>

                                        {turno.paciente?.DNI}

                                    </h5>


                                    <Card>

                                        <h5>

                                            Especialidad: {turno.especialidad}

                                        </h5>

                                        <h5>
                                            {turno.fechaTurno}
                                        </h5>

                                    </Card>


                                    <h5 className="mt-3">

                                        {turno.estado === "Atendido" ? (

                                            <Badge bg="success">

                                                Atendido

                                            </Badge>

                                        ) : (

                                            <Badge
                                                bg="warning"
                                                text="dark"
                                            >

                                                En Espera

                                            </Badge>

                                        )}

                                    </h5>

                                    <Button

                                        onClick={() =>
                                            marcarComoAtendido(turno.id)
                                        }

                                        disabled={
                                            turno.estado === "Atendido"
                                        }

                                    >

                                        Llamar

                                    </Button>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))

                )}

            </Row>

            {/* FORMULARIO Y JSON ABAJO */}

            <FormularioPaciente />

            <h2 className="mt-5 mb-4">Pacientes Cargados</h2>

            <input
    type="text"
    className="form-control mb-4"
    placeholder="Buscar paciente por nombre o DNI..."
    value={busquedaPaciente}
    onChange={(evento) => setBusquedaPaciente(evento.target.value)}
/>

<Row>
    {pacientesFiltrados.map((paciente) => (
        <Col md={4} key={paciente.id} className="mb-3">
            <Card>
                <Card.Body>
                    <Card.Title>
                        {paciente.nombre}
                    </Card.Title>

                    <p>DNI: {paciente.dni}</p>

                    <p>Email: {paciente.email}</p>

                    <p>
                        Obra Social: {paciente.obraSocial?.nombre}
                    </p>
                </Card.Body>
            </Card>
        </Col>
    ))}
</Row>

        </Container>

    );

};

export default DashboardRecepcion;