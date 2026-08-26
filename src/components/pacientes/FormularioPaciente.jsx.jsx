import { useState } from 'react';
import styles from './FormularioPaciente.module.scss';
import JsonDebugger from '../utils/jsondebugger';

const FormularioPaciente = () => {

    const [paciente, setPaciente] = useState({
        nombre: '',
        email: '',
        dni: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPaciente({
            ...paciente,
            [name]: value
        });
    };

    return (
        <div className={styles.contenedorFormulario}>
            <h3>Ingreso de Nuevo Paciente</h3>

            <form>
                <input
                    type="text"
                    name="nombre"
                    value={paciente.nombre}
                    className={styles.campoInput}
                    placeholder="Nombre completo"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="email"
                    value={paciente.email}
                    className={styles.campoInput}
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="dni"
                    value={paciente.dni}
                    className={styles.campoInput}
                    placeholder="DNI"
                    onChange={handleChange}
                />
            </form>

            <JsonDebugger
                data={paciente}
                titulo="Estado actual del JSON del paciente"
            />
        </div>
    );
};

export default FormularioPaciente;