import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const ViewLocationDetails = () => {
  const deviceDetails = useSelector((state) => state.clientLocation.DeviceDetails);
  const status = useSelector((state) => state.clientLocation.status);
  const error = useSelector((state) => state.clientLocation.error);
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {/* Loading, Error, and No Details Found States */}
          {status === 'loading' && <p className="text-center">Loading...</p>}
          {status === 'failed' && <p className="text-center text-danger">Error: {error}</p>}
          {status === 'succeeded' && deviceDetails ? (
            <Card className="mb-4 shadow-sm">

              <CardBody>
                <CardTitle tag="h2" className="text-center mb-4">
                 Client Device Location Details
                </CardTitle>

                
                <CardText className="mb-2">
                  <strong>City :</strong> {deviceDetails.address}
                </CardText>

                <CardText className="mb-2">
                  <strong>Address:</strong> {deviceDetails.address}
                </CardText>

                <CardText className="mb-2">
                  <strong>Updated At:</strong> {new Date(deviceDetails.updatedAt).toLocaleDateString()}
                </CardText>

                <CardText className="mb-2">
                  <strong>Created At:</strong> {new Date(deviceDetails.createdAt).toLocaleDateString()}
                </CardText>

                {/* Go Back Button */}
                <div className="text-center mt-4">
                  <Button 
                    color="secondary" 
                    onClick={() => navigate(-1)} 
                    style={{ borderRadius: '20px', padding: '0.5rem 2rem' }}
                  >
                    Go Back
                  </Button>
                </div>
              </CardBody>
            </Card>
          ) : (
            <p className="text-center">No details found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewLocationDetails;
