export const validarDatos = (datos, reglas) => {
    let errores = {};

    for (let campo in reglas) {

        const mensajeError = reglas[campo](datos[campo]);

        if (mensajeError) {
            errores[campo] = mensajeError;
        }
    }

    return errores;

};