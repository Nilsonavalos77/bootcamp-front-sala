import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import styles from './formulariopaciente.module.scss';
import JsonDebugger from '../utils/jsondebugger';
import { Button } from 'react-bootstrap';
import { validarDatos } from '../utils/validaciones';
import DatosPersonales from './DatosPersonales';
import DireccionPaciente from './DireccionPaciente';
import HistorialMedicoPaciente from './HistorialMedicoPaciente';
import ObraSocialPaciente from './ObraSocial';
import TelefonoPaciente from './TelefonoPaciente';
import clientesAxios from "../../config/axios";

const reglasPaciente = {
    nombre: (valor) => valor.trim() === "" ? "El nombre es obligatorio." : null,
    dni: (valor) => valor.length < 8 ? "El DNI debe tener 8 números mínimo" : null,
    email: (valor) => !valor.includes("@") ? "Debe ser un correo válido." : null
};

const estadoInicial = {
    nombre: "",
    dni: "",
    email: "",
    direccion: { calle: "", numero: "", piso: "", departamento: "", barrio: "" },
    telefono: { tipo: "CELULAR", codigoArea: "", numero: "" },
    obraSocial: { nombre: "", numeroAfiliado: "" },
    historialMedico: { fecha: "", diagnostico: "", tratamiento: "", medico: "" }
};

const FormularioPaciente = ({ onPacienteGuardado }) => {
    const [paciente, setPaciente] = useState(estadoInicial);
    const [errores, setErrores] = useState({});
    const navigate = useNavigate(); 

    const handleChange = (evento) => {
        const { name, value } = evento.target;

        if (name.includes('.')) {
            const [seccion, propiedad] = name.split('.'); 
            setPaciente({
                ...paciente,
                [seccion]: {
                    ...paciente[seccion], 
                    [propiedad]: value    
                }
            });
        } else {
            setPaciente({ ...paciente, [name]: value });
        }
    };

    const handleSubmit = async (evento) => {
        evento.preventDefault();

        const nuevosErrores = validarDatos(paciente, reglasPaciente);
        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) return;

        try {
            const resPaciente = await clientesAxios.post('/pacientes', paciente);
            
            const pacienteCreado = resPaciente.data?.data || resPaciente.data;
            const idPaciente = pacienteCreado?._id || pacienteCreado?.id;

            if (!idPaciente) {
                throw new Error("No se obtuvo un ID válido al crear el paciente.");
            }

            const fechaFutura = new Date(Date.now() + 2 * 60 * 1000).toISOString();

            const payloadTurno = {
                paciente: idPaciente,
                especialidad: "cardiologia",
                fechaTurno: fechaFutura,
                estado: "pendiente",
                observaciones: paciente.historialMedico?.diagnostico || "Atención por guardia"
            };

            const token = localStorage.getItem('token');

            await clientesAxios.post('/turnos', payloadTurno, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'x-origen': 'recepcion'
                }
            });

            toast.success("¡Paciente y Turno creados con éxito!");

            setPaciente(estadoInicial);
            setErrores({});

            if (typeof onPacienteGuardado === 'function') {
                await onPacienteGuardado();
            }

            navigate('/dashboard');

        } catch (error) {
            console.error("Error al procesar:", error.response?.data || error);
            const msg = error.response?.data?.data || error.response?.data?.message || error.message || "Error al procesar el formulario";
            toast.error("Error: " + msg);
        }
    };

    return (
        <div className={styles.contenedorFormulario}>
            <h3>Ingreso de Nuevo Paciente</h3>
            <form onSubmit={handleSubmit}>
                <DatosPersonales paciente={paciente} errores={errores} onChange={handleChange} styles={styles} />
                <DireccionPaciente direccion={paciente.direccion} onChange={handleChange} styles={styles} />
                <TelefonoPaciente telefono={paciente.telefono} onChange={handleChange} styles={styles} />
                <ObraSocialPaciente obraSocial={paciente.obraSocial} onChange={handleChange} styles={styles} />
                <HistorialMedicoPaciente historialMedico={paciente.historialMedico} onChange={handleChange} styles={styles} />
                <Button type="submit" className="mt-3">Guardar</Button>
            </form>
            <JsonDebugger data={paciente} titulo="ESTADO DEL JSON" />
        </div>
    );
};

export default FormularioPaciente;