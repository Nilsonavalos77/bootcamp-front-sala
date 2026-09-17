import { useState, useEffect } from 'react';
import { Spinner, Table, Alert, Container, Badge } from 'react-bootstrap';
import clientesAxios from '../config/axios';
import { FormularioMedico } from '../components/medico/FormularioMedico';

const MedicosPage = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerMedicos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const respuesta = await clientesAxios.get('/medicos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const listaMedicos = Array.isArray(respuesta.data)
        ? respuesta.data
        : respuesta.data?.data || [];

      setMedicos(listaMedicos);
    } catch (err) {
      console.error('Error al obtener médicos:', err);
      setError(
        err.response?.data?.message || 'No se pudo cargar la lista de médicos.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerMedicos();
  }, []);

  return (
    <Container className="mt-4 mb-5">
      {/* Formulario de Registro */}
      <FormularioMedico onMedicoCreado={obtenerMedicos} />

      {/* Título y Contador */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Médicos</h2>
        <Badge bg="info" className="fs-6">
          Total: {medicos.length}
        </Badge>
      </div>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-secondary">Cargando datos...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm bg-white">
          <thead className="table-dark">
            <tr>
              <th>Nombre y Apellido</th>
              <th>Matrícula</th>
              <th>DNI</th>
              <th>Celular</th>
              <th>Días</th>
              <th>Horarios</th>
            </tr>
          </thead>
          <tbody>
            {medicos && medicos.length > 0 ? (
              medicos.map((medico, index) => (
                <tr key={medico._id || index}>
                  <td className="fw-semibold">{medico.nombre}</td>
                  <td>{medico.matricula || 'N/A'}</td>
                  <td>{medico.dni || 'N/A'}</td>
                  <td>{medico.celular || 'No registrado'}</td>
                  <td>{medico.dias || 'No especificado'}</td>
                  <td>{medico.horarios || 'No especificado'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No hay médicos registrados actualmente.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MedicosPage;