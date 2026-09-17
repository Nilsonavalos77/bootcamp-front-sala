const TelefonoPaciente = ({ telefono, onChange, styles }) => (
    <fieldset>
        <legend>Teléfono</legend>
        <select
            name="telefono.tipo"
            value={telefono.tipo}
            className={styles.campoInput}
            onChange={onChange}
        >
            <option value="CELULAR">Celular</option>
            <option value="FIJO">Fijo</option>
        </select>
        <input
            type="text"
            name="telefono.codigoArea"
            value={telefono.codigoArea}
            className={styles.campoInput}
            placeholder="Código de Área"
            onChange={onChange}
        />
        <input
            type="text"
            name="telefono.numero"
            value={telefono.numero}
            className={styles.campoInput}
            placeholder="Número de Teléfono"
            onChange={onChange}
        />
    </fieldset>
);

export default TelefonoPaciente;
