import { useState } from "react";
import { useFetch } from "../hooks/usefetch";
import { Container, Row, Col, Card } from "react-bootstrap";
import { toast } from 'sonner';
import clientAxios from "../config/axios";

import FormularioPaciente from "../components/pacientes/FormularioPaciente";
import BuscadorTurnos from "../components/turnos/BuscadorTurnos";
import TurnoCard from "../components/turnos/TurnoCard";
import TurnoCardSkeleton from "../components/turnos/TurnoCardSkeleton.jsx";

const DashboardRecepcion = () => {
    const [busquedaTurnos, setBusquedaTurnos] = useState("");
    const [busquedaPacientes, setBusquedaPacientes] = useState("");

    const { data: turnos, setData: setTurnos, isLoading: loadingTurnos } = useFetch('/turnos');
    const { data: pacientes, isLoading: loadingPacientes } = useFetch('/pacientes');


    const listaTurnos = Array.isArray(turnos) ? turnos : (turnos?.turnos || turnos?.data || []);
    const listaPacientes = Array.isArray(pacientes) ? pacientes : (pacientes?.pacientes || pacientes?.data || []);

    const turnosFiltrados = listaTurnos.filter(turno => {
        const busqueda = busquedaTurnos.toLowerCase().trim();
        if (!busqueda) return true;
        const nombre = turno.paciente?.nombre || turno.paciente?.nombreCompleto || "";
        const dni = turno.paciente?.dni || "";
        return nombre.toLowerCase().includes(busqueda) || dni.toString().includes(busqueda);
    });

    const pacientesFiltrados = listaPacientes.filter(paciente => {
        const busqueda = busquedaPacientes.toLowerCase().trim();
        if (!busqueda) return true;
        const nombre = paciente.nombre || paciente.nombreCompleto || paciente.apellido || "";
        const dni = paciente.dni || "";
        return nombre.toLowerCase().includes(busqueda) || dni.toString().includes(busqueda);
    });

    const marcarComoAtendido = async (idTurno) => {
        try {
            await clientAxios.patch(`/turnos/${idTurno}`);

            const turnosActualizados = listaTurnos.map(turno => {
                if ((turno.id || turno._id) === idTurno) return { ...turno, estado: "atendido" };
                return turno;
            });
            setTurnos(turnosActualizados);
            toast.success("Turno marcado como atendido.");

        } catch (error) {
            console.error(error);
            toast.error("Error de red.");
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">Turnos del Día</h2>
            <BuscadorTurnos valor={busquedaTurnos} alCambiar={setBusquedaTurnos} />
            <Row className="mb-5">
                {loadingTurnos ? (
                    [1, 2, 3, 4].map(item => <TurnoCardSkeleton key={item} />) 
                ) : turnosFiltrados.length === 0 ? (
                    <p className="text-center">No se encontraron turnos pendientes.</p>
                ) : (
                    turnosFiltrados.map((turno) => (
                        <TurnoCard
                            key={turno.id || turno._id}
                            turno={turno}
                            onAtender={marcarComoAtendido}
                        />
                    ))
                )}
            </Row>

            <hr className="my-5" />
            <FormularioPaciente />

            <hr className="my-5" />
            <h2 className="mb-4 text-center">Pacientes Registrados</h2>
            
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Buscar paciente registrado por nombre o DNI..."
                value={busquedaPacientes}
                onChange={(e) => setBusquedaPacientes(e.target.value)}
            />

            <Row className="mb-5">
                {loadingPacientes ? (
                    <p className="text-center">Cargando pacientes...</p>
                ) : pacientesFiltrados.length === 0 ? (
                    <p className="text-center">No se encontraron pacientes registrados.</p>
                ) : (
                    pacientesFiltrados.map((paciente) => (
                        <Col md={4} key={paciente._id || paciente.id} className="mb-3">
                            <Card className="shadow-sm border">
                                <Card.Body>
                                    <Card.Title className="fw-bold">
                                        {paciente.nombre || paciente.nombreCompleto || `${paciente.apellido || ''}`}
                                    </Card.Title>
                                    <p className="mb-1"><strong>DNI:</strong> {paciente.dni || "N/A"}</p>
                                    <p className="mb-1"><strong>Email:</strong> {paciente.email || "N/A"}</p>
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