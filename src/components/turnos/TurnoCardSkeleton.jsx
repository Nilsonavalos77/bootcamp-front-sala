import { Col, Card, Placeholder } from 'react-bootstrap';

const TurnoCardSkeleton = () => {
    return (
        <Col md={4} className="mb-3">
            <Card className="shadow-sm border">
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" className="mt-2">
                        <Placeholder xs={5} />
                    </Placeholder>
                    <Placeholder.Button variant="primary" xs={12} className="mt-2" disabled />
                </Card.Body>
            </Card>
        </Col>
    );
};

export default TurnoCardSkeleton;