const DatosPersonales = ({ paciente, errores, onChange, styles }) => (
    <fieldset>
        <legend>Datos Personales</legend>
        <input
            type="text"
            name="nombre"
            value={paciente.nombre}
            className={styles.campoInput}
            placeholder="Nombre completo"
            onChange={onChange}
        />
        {errores.nombre && <span className={styles.textoError}>{errores.nombre}</span>}
        <input
            type="text"
            name="dni"
            value={paciente.dni}
            className={styles.campoInput}
            placeholder="DNI"
            onChange={onChange}
        />
        {errores.dni && <span className={styles.textoError}>{errores.dni}</span>}
        <input
            type="email"
            name="email"
            value={paciente.email}
            className={styles.campoInput}
            placeholder="Email"
            onChange={onChange}
        />
        {errores.email && <span className={styles.textoError}>{errores.email}</span>}
    </fieldset>
);

export default DatosPersonales;
