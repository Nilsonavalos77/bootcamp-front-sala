const ObraSocialPaciente = ({ obraSocial, onChange, styles }) => (
    <fieldset>
        <legend>Obra Social</legend>
        <input
            type="text"
            name="obraSocial.nombre"
            value={obraSocial.nombre}
            className={styles.campoInput}
            placeholder="Nombre Obra Social"
            onChange={onChange}
        />
        <input
            type="text"
            name="obraSocial.numeroAfiliado"
            value={obraSocial.numeroAfiliado}
            className={styles.campoInput}
            placeholder="Nº de Afiliado"
            onChange={onChange}
        />
    </fieldset>
);

export default ObraSocialPaciente;
