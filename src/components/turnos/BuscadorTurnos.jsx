import { Row, Col, Form } from 'react-bootstrap';
const BuscadorTurnos = ({ valor, alCambiar }) => {
    return (
        <Row className="mb-4">
                <Col md={6}>
                    <Form.Control 
                        type="text"
                        placeholder="Buscar paciente por nombre o DNI..."
                        value={valor}
                        onChange={(evento) => alCambiar(evento.target.value)}
                    />
                </Col>    
            </Row>
    );
};

export default BuscadorTurnos