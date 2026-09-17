import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const NotFound = () => {
    return (
        <Container className="py-5">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col xs={12} md={8} lg={6}>
                    <Card className="border-0 shadow-sm text-center">
                        <Card.Body className="p-4 p-md-5">
                            <div className="display-1 fw-bold text-primary mb-3" aria-hidden="true">
                                404
                            </div>
                            <Card.Title as="h1" className="h3 mb-3">
                                Pagina no encontrada
                            </Card.Title>
                            <Card.Text className="text-body-secondary mb-4">
                                La pagina que buscas no existe o ya no esta disponible.
                            </Card.Text>
                            <Button as={Link} to="/" variant="primary">
                                Volver al inicio
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;