import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const NavbarPrincipal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Sesión cerrada');
    navigate('/');
  };

  return (
    <Navbar 
      expand="lg" 
      className="bg-white border-bottom shadow-sm py-2 sticky-top mb-4"
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/dashboard" 
          className="d-flex align-items-center gap-2 fw-bold text-primary fs-4"
        >
          <span className="bg-primary text-white rounded-3 px-2 py-1 fs-6">
            🏥
          </span>
          <span>Salita Municipal</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-2 mt-3 mt-lg-0">
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              className={`px-3 py-2 rounded-2 fw-semibold transition-all ${
                location.pathname === '/dashboard' 
                  ? 'bg-primary-subtle text-primary' 
                  : 'text-secondary hover-bg-light'
              }`}
            >
              Dashboard
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/nuevo-paciente" 
              className={`px-3 py-2 rounded-2 fw-semibold transition-all ${
                location.pathname === '/nuevo-paciente' 
                  ? 'bg-primary-subtle text-primary' 
                  : 'text-secondary hover-bg-light'
              }`}
            >
              Registrar Paciente
            </Nav.Link>

            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={handleLogout}
              className="fw-semibold ms-lg-2 px-3 py-2"
            >
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrincipal;