const HistorialMedicoPaciente = ({ historialMedico, onChange, styles }) => (
    <fieldset>
        <legend>Historial Médico</legend>
        <input
            type="datetime-local"
            name="historialMedico.fecha"
            value={historialMedico.fecha}
            className={styles.campoInput}
            onChange={onChange}
        />
        <input
            type="text"
            name="historialMedico.diagnostico"
            value={historialMedico.diagnostico}
            className={styles.campoInput}
            placeholder="Diagnóstico"
            onChange={onChange}
        />
        <input
            type="text"
            name="historialMedico.tratamiento"
            value={historialMedico.tratamiento}
            className={styles.campoInput}
            placeholder="Tratamiento"
            onChange={onChange}
        />
        <input
            type="text"
            name="historialMedico.medico"
            value={historialMedico.medico}
            className={styles.campoInput}
            placeholder="Médico a cargo"
            onChange={onChange}
        />
    </fieldset>
);

export default HistorialMedicoPaciente;
