import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';  // Import useParams
import { createClientlocation } from '../../Slices/DevicesLocationSlice';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const AddDeviceLocation = () => {
  const { client_id, user_id } = useParams();  // Get client_id and user_id from the URL
  const dispatch = useDispatch();
  const { loading, error, CreatedDevicesLocation } = useSelector((state) => state.clientLocation);

  const [formData, setFormData] = useState({
    locationname: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Include client_id and user_id in the formData
    const updatedFormData = {
      ...formData,
      clientId: client_id,
      createdById: user_id,
    };
    dispatch(createClientlocation(updatedFormData));
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="locationname">Location Name</Label>
          <Input
            type="text"
            name="locationname"
            id="locationname"
            value={formData.locationname}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit" color="primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
        {error && <p className="text-danger mt-2">Error: {error}</p>}
        {CreatedDevicesLocation && <p className="text-success mt-2">Success!</p>}
      </Form>
    </Container>
  );
};

export default AddDeviceLocation;
