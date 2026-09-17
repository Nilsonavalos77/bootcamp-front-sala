import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      if (response.data.ok) {
        localStorage.setItem('token', response.data.token);

        toast.success('¡Sesión iniciada con éxito!');

        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Email o contraseña incorrectos.');
      } else {
        setError('Error al conectar con el servidor.');
      }
      toast.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="shadow-sm border-0">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <span className="bg-primary text-white rounded-3 px-3 py-2 fs-4 d-inline-block mb-2">
              🏥
            </span>
            <h3 className="fw-bold">Salita Municipal</h3>
            <p className="text-muted">Ingresá tus datos para acceder</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="....@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label className="fw-semibold">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2 fw-bold" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;