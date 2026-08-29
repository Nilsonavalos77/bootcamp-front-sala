import { useState } from 'react';
import styles from './FormularioPaciente.module.scss';
import JsonDebugger from '../utils/JsonDebugger';
import { Button } from 'react-bootstrap';
import { validarDatos } from '../utils/validaciones';

const reglasPaciente = {
    nombre: (valor) => valor.trim() === "" ? "El nombre es obligatorio." : null,
    dni: (valor) => valor.length < 8 ? "El DNI debe tener 8 numeros minimo" : null,
    email: (valor) => !valor.includes("@") ? "Debe ser un correo valido. " : null
};


const FormularioPaciente = () => {
    const [paciente, setPaciente] = useState({
        nombre: "",
        dni: "",
        email: "",
        direccion: {
            calle: "",
            numero: "",
            piso: "",
            departamento: "",
            barrio: ""
        },
        telefono: {
            tipo: "CELULAR", 
            codigoArea: "",
            numero: ""
        },
        obraSocial: {
            nombre: "",
            numeroAfiliado: ""
        },
        historialMedico: {
            fecha: "",
            diagnostico: "",
            tratamiento: "",
            medico: ""
        }
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
            setPaciente({
                ...paciente,
                [name]: value
            });
        }
    };

    const handleSubmit = async (evento) => {

        evento.preventDefault();

        const nuevosErrores = validarDatos(paciente, reglasPaciente);

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            console.log("Validacion fallida");
            return;
        }

        try {

            const respuesta = await fetch("http://localhost:3000/api/v1/pacientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paciente)
            });

            const data = await respuesta.json();

            if (respuesta.ok) {
                alert("Paciente gaardado en base de datos");
            } else {
                alert("error del servidor: " + data.message + "errores: " +data.data);
            }

        } catch (error) {
            console.error("Error de conexion", error);
            alert("el servidor esta apagado o no responde");
        }

        console.log(paciente);
    };

    return (
        <div className={styles.contenedorFormulario}>
            <h3>Ingreso de Nuevo Paciente</h3>
            <form onSubmit={handleSubmit}>
                {/* --- DATOS PERSONALES --- */}
                <fieldset>
                    <legend>Datos Personales</legend>
                    <input 
                        type="text" name="nombre" value={paciente.nombre} 
                        className={styles.campoInput} placeholder="Nombre completo" onChange={handleChange} 
                    />
                    {errores.nombre && <span className={styles.textoError}>{errores.nombre}</span>}
                    <input 
                        type="text" name="dni" value={paciente.dni} 
                        className={styles.campoInput} placeholder="DNI" onChange={handleChange} 
                    />
                    {errores.dni && <span className={styles.textoError}>{errores.dni}</span>}
                    <input 
                        type="email" name="email" value={paciente.email} 
                        className={styles.campoInput} placeholder="Email" onChange={handleChange} 
                    />
                    {errores.email && <span className={styles.textoError}>{errores.email}</span>}
                </fieldset>

                {/* --- DIRECCIÓN --- */}
                <fieldset>
                    <legend>Dirección</legend>
                    <input 
                        type="text" name="direccion.calle" value={paciente.direccion.calle} 
                        className={styles.campoInput} placeholder="Calle" onChange={handleChange} 
                    />
                    <input 
                        type="text" name="direccion.numero" value={paciente.direccion.numero} 
                        className={styles.campoInput} placeholder="Número" onChange={handleChange} 
                    />
                    <input 
                        type="text" name="direccion.piso" value={paciente.direccion.piso} 
                        className={styles.campoInput} placeholder="Piso" onChange={handleChange} 
                    />
                    <input 
                        type="text" name="direccion.departamento" value={paciente.direccion.departamento} 
                        className={styles.campoInput} placeholder="Departamento" onChange={handleChange} 
                    />
                    <input 
                        type="text" name="direccion.barrio" value={paciente.direccion.barrio} 
                        className={styles.campoInput} placeholder="Barrio" onChange={handleChange} 
                    />
                </fieldset>

                {/* --- TELÉFONO --- */}
                <fieldset>
                    <legend>Teléfono</legend>
                    <select 
                        name="telefono.tipo" value={paciente.telefono.tipo} 
                        className={styles.campoInput} onChange={handleChange}
                    >
                        <option value="CELULAR">Celular</option>
                        <option value="FIJO">Fijo</option>
                    </select>
                    <input 
                        type="text" name="telefono.codigoArea" value={paciente.telefono.codigoArea} 
                        className={styles.campoInput} placeholder="Código de Área" onChange={handleChange} 
                    />
                    <input 
                        type="text" name="telefono.numero" value={paciente.telefono.numero} 
                        className={styles.campoInput} placeholder="Número de Teléfono" onChange={handleChange} 
                    />
                </fieldset>

                {/* --- OBRA SOCIAL --- */}
                <fieldset>
                    <legend>Obra Social</legend>
                    <input 
                        type="text" name="obraSocial.nombre" value={paciente.obraSocial.nombre} 
                        className={styles.campoInput} placeholder="Nombre Obra Social" onChange={handleChange} 
                    />
                    <input 
                        type="text" name="obraSocial.numeroAfiliado" value={paciente.obraSocial.numeroAfiliado} 
                        className={styles.campoInput} placeholder="Nº de Afiliado" onChange={handleChange} 
                    />
                </fieldset>

                {/* --- HISTORIAL MÉDICO --- */}
                <fieldset>
                    <legend>Historial Médico</legend>
                    <input 
                        type="datetime-local" name="historialMedico.fecha" value={paciente.historialMedico.fecha} 
                        className={styles.campoInput} onChange={handleChange} 
                    />
                    <input 
                        type="text" name="historialMedico.diagnostico" value={paciente.historialMedico.diagnostico} 
                        className={styles.campoInput} placeholder="Diagnóstico" onChange={handleChange} 
                    />
                    <input 
                        type="text" name="historialMedico.tratamiento" value={paciente.historialMedico.tratamiento} 
                        className={styles.campoInput} placeholder="Tratamiento" onChange={handleChange} 
                    />
                    <input 
                        type="text" name="historialMedico.medico" value={paciente.historialMedico.medico} 
                        className={styles.campoInput} placeholder="Médico a cargo" onChange={handleChange} 
                    />
                </fieldset>

                <Button type="submit">Guardar </Button>
            </form>

            <JsonDebugger
                data={paciente}
                titulo="ESTADO DEL JSON"
            />
        </div>
    );
};

export default FormularioPaciente;