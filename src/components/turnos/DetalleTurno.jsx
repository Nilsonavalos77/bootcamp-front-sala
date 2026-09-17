import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/usefetch';

const DetalleTurno = () => {

    const { id } = useParams();

    const { data: turno } = useFetch(`/turnos/?id=${id}`)

    return (

        <div>
            <h2>Detalles del Turno</h2>
            <p>Buscando en la base de datos el ID: <strong>{id}</strong></p>
            <h3>{turno.id}</h3>
        </div>
    );
};

export default DetalleTurno;