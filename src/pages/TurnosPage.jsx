import { useState, useEffect } from 'react';
import clientesAxios from '../config/axios';
import TurnoCard from '../components/turnos/TurnoCard';
import TurnoCardSkeleton from '../components/turnos/TurnoCardSkeleton';

const TurnosPage = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerTurnos = async () => {
      try {
        const res = await clientesAxios.get('/turnos');
        setTurnos(res.data?.data || res.data);
      } catch (error) {
        console.error("Error al cargar turnos", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerTurnos();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h2>Listado de Turnos</h2>
        <div className="d-flex flex-column gap-3 mt-3">
          <TurnoCardSkeleton />
          <TurnoCardSkeleton />
          <TurnoCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Listado de Turnos</h2>
      <div className="row mt-3">
        {turnos.map((turno) => (
          <TurnoCard key={turno._id || turno.id} turno={turno} />
        ))}
      </div>
    </div>
  );
};

export default TurnosPage;