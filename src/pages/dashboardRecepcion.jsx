import { useState, useEffect } from "react";

import { Container, Badge, Row, Col, Card, Button } from "react-bootstrap";

import FormularioPaciente from "../components/pacientes/FormularioPaciente";

import clientAxios from "../config/axios";


const DashboardRecepcion = () => {

    const [busqueda, setBusqueda] = useState("");

    const [turnos, setTurnos] = useState([]);

    const turnosFiltrados = turnos.filter((turno) =>
        turno.paciente?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
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

        </Container>

    );

};

export default DashboardRecepcion;