import { useState, useEffect } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import clientesAxios from '../config/axios';

const PacientesPage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const res = await clientesAxios.get('/pacientes');
        setPacientes(res.data?.data || res.data);
      } catch (error) {
        console.error("Error al cargar pacientes", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerPacientes();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando pacientes...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Listado de Pacientes</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p._id || p.id}>
              <td>{p.nombre} {p.apellido}</td>
              <td>{p.dni}</td>
              <td>{p.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PacientesPage;