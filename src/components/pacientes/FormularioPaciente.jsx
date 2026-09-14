import { useState } from 'react';
import styles from './formulariopaciente.module.scss';
import JsonDebugger from '../utils/jsondebugger';
import { Button } from 'react-bootstrap';
import { validarDatos } from '../utils/validaciones';
import DatosPersonales from './DatosPersonales';
import DireccionPaciente from './DireccionPaciente';
import HistorialMedicoPaciente from './HistorialMedicoPaciente';
import ObraSocialPaciente from './ObraSocial';
import TelefonoPaciente from './TelefonoPaciente';

const reglasPaciente = {
    nombre: (valor) => valor.trim() === "" ? "El nombre es obligatorio." : null,
    dni: (valor) => valor.length < 8 ? "El DNI debe tener 8 numeros minimo" : null,
    email: (valor) => !valor.includes("@") ? "Debe ser un correo valido. " : null
};

const FormularioPaciente = ({ onPacienteGuardado }) => {
    const [paciente, setPaciente] = useState({
        nombre: "",
        dni: "",
        email: "",
        direccion: { calle: "", numero: "", piso: "", departamento: "", barrio: "" },
        telefono: { tipo: "CELULAR", codigoArea: "", numero: "" },
        obraSocial: { nombre: "", numeroAfiliado: "" },
        historialMedico: { fecha: "", diagnostico: "", tratamiento: "", medico: "" }
    });

    const [errores, setErrores] = useState({});

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
            const respuesta = await fetch("http://localhost:3000/api/v1/pacientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paciente)
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                alert("Paciente guardado en base de datos");
                if (onPacienteGuardado) onPacienteGuardado(data);
            } else {
                alert("Error del servidor: " + data.message);
            }
        } catch (error) {
            console.error("Error de conexión", error);
            alert("El servidor está apagado o no responde");
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
                <Button type="submit">Guardar</Button>
            </form>
            <JsonDebugger data={paciente} titulo="ESTADO DEL JSON" />
        </div>
    );
};

export default FormularioPaciente;