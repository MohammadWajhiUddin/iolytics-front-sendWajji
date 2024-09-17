import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateDeviceLocation = () => {
  const { client_id, user_id, location_id } = useParams();
  const navigate = useNavigate();
  const deviceDetails = useSelector((state) => state.clientLocation.DeviceDetails);

  const [locationname, setLocationname] = useState(deviceDetails.locationname || '');
  const [address, setAddress] = useState(deviceDetails.address || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!deviceDetails) {
      // If deviceDetails are not loaded, navigate back or handle the case
      navigate(`/location-details/${location_id}`);
    }
  }, [deviceDetails, navigate, location_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      id: parseInt(location_id),
      locationname: locationname,
      address: address,
      clientId: client_id,
      updatedById: user_id,
    };

    try {
      const response = await fetch("https://tempin.qastco.co.uk:3231/api/clientlocation/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setLoading(false);

      if (!response.ok) {
        const error = await response.json();
        console.error("API Error:", error);
        alert(`Failed to update location: ${error.message || response.statusText}`);
        return;
      }

      const result = await response.json();
      alert(`Location updated successfully`);
      

    } catch (error) {
      console.error("Network or server error:", error);
      alert("An error occurred while updating the location. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {/* Card Component */}
          <Card>
            <CardHeader className="text-center">
              <h4>Update Device Location</h4>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                {/* Location Name */}
                <FormGroup>
                  <Label for="locationname">Location Name</Label>
                  <Input
                    type="text"
                    id="locationname"
                    value={locationname}
                    onChange={(e) => setLocationname(e.target.value)}
                    required
                  />
                </FormGroup>

                {/* Address */}
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </FormGroup>

                {/* Buttons */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {/* Go Back Button */}
                  <Button
                    color="secondary"
                    onClick={() => navigate(-1)}
                    style={{ borderRadius: '20px', padding: '0.5rem 2rem' }}
                  >
                    Go Back
                  </Button>

                  {/* Submit Button with Spinner */}
                  <Button type="submit" color="primary" disabled={loading} style={{ borderRadius: '20px' }}>
                    {loading ? (
                      <>
                        <Spinner size="sm" /> Updating...
                      </>
                    ) : (
                      'Update Location'
                    )}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateDeviceLocation;
