import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const ViewLocationDetails = () => {
  const deviceDetails = useSelector((state) => state.clientLocation.DeviceDetails);
  const status = useSelector((state) => state.clientLocation.status);
  const error = useSelector((state) => state.clientLocation.error);



  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && deviceDetails ? (
            <Card className="mb-3">
              <CardBody>
                <CardTitle tag="h2">{deviceDetails.locationname}</CardTitle>
                <CardText>
                  <strong>Address:</strong> {deviceDetails.address}
                </CardText>
                <CardText>
                  <strong>Updated At:</strong>{' '}
                  {new Date(deviceDetails.updatedAt).toLocaleDateString()}
                </CardText>
                <CardText>
                  <strong>Created At:</strong>{' '}
                  {new Date(deviceDetails.createdAt).toLocaleDateString()}
                </CardText>
              </CardBody>
            </Card>
          ) : (
            <p>No details found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewLocationDetails;
