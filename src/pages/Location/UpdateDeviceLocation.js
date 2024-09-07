import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateDeviceLocation = () => {
  const { client_id, user_id, location_id } = useParams();
  const navigate = useNavigate();
  const deviceDetails = useSelector((state) => state.clientLocation.DeviceDetails);

  const [locationname, setLocationname] = useState(deviceDetails.locationname || '');
  const [address, setAddress] = useState(deviceDetails.address || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id:parseInt(location_id),
      locationname:locationname,
      address:address,
      clientId:client_id,
      updatedById:user_id,
    };

    try {
      const response = await fetch("https://tempin.qastco.co.uk:3231/api/clientlocation/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("API Error:", error);
        alert(`Failed to update location: ${error.message || response.statusText}`);
        return;
      }

      const result = await response.json();
      alert(`Location updated successfully: ${result.message}`);
      navigate(`/location-details/${location_id}`); // Redirect after successful update

    } catch (error) {
      console.error("Network or server error:", error);
      alert("An error occurred while updating the location. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
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
            <Button color="primary" type="submit">
              Update Location
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateDeviceLocation;
