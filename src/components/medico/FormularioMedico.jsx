import { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import clientesAxios from '../../config/axios';

const FormularioMedico = ({ onMedicoCreado }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    matricula: '',
    dni: '',
    celular: '',
    dias: '',
    horarios: ''
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const token = localStorage.getItem('token');
      await clientesAxios.post('/medicos', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMensaje({ tipo: 'success', texto: 'Médico registrado exitosamente.' });
      setFormData({
        nombre: '',
        matricula: '',
        dni: '',
        celular: '',
        dias: '',
        horarios: ''
      });

      if (onMedicoCreado) {
        onMedicoCreado();
      }
    } catch (error) {
      console.error(error);
      setMensaje({
        tipo: 'danger',
        texto: error.response?.data?.message || 'Error al guardar el médico.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header bg="primary" className="bg-primary text-white">
        <h5 className="mb-0">Registrar Nuevo Médico</h5>
      </Card.Header>
      <Card.Body>
        {mensaje.texto && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre y Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ej: Dr. Carlos Gómez"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Matrícula</Form.Label>
                <Form.Control
                  type="text"
                  name="matricula"
                  placeholder="Ej: MP-4589"
                  value={formData.matricula}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="text"
                  name="dni"
                  placeholder="Ej: 32456789"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Celular / Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="celular"
                  placeholder="Ej: 3624123456"
                  value={formData.celular}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Días de Atención</Form.Label>
                <Form.Control
                  type="text"
                  name="dias"
                  placeholder="Ej: Lunes a Viernes"
                  value={formData.dias}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Horarios de Atención</Form.Label>
                <Form.Control
                  type="text"
                  name="horarios"
                  placeholder="Ej: 08:00 - 14:00"
                  value={formData.horarios}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3 text-end">
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Médico'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export { FormularioMedico };