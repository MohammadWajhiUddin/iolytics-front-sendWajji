import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createClientlocation, resetCreatedDevicesLocation } from '../../Slices/DevicesLocationSlice';
import { 
  Container, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Spinner, 
  Alert 
} from 'reactstrap';

const AddDeviceLocation = () => {
  const { client_id, user_id } = useParams();  // Get client_id and user_id from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, CreatedDevicesLocation } = useSelector((state) => state.clientLocation);

  const [formData, setFormData] = useState({
    locationname: '',
    address: '',
  });

  useEffect(() => {
    // Reset success state when component mounts
    dispatch(resetCreatedDevicesLocation());
  }, [dispatch]);

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
      <Card>
        <CardHeader className="text-center">
          <h4>Add Device Location</h4>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            {/* Success and Error Alerts */}
            {CreatedDevicesLocation && (
              <Alert color="success" className="text-center">
                Device location added successfully!
              </Alert>
            )}
            {error && (
              <Alert color="danger" className="text-center">
                Error: {error}
              </Alert>
            )}
            
            {/* Location Name */}
            <FormGroup>
              <Label for="locationname">Location Name</Label>
              <Input
                type="text"
                name="locationname"
                id="locationname"
                value={formData.locationname}
                onChange={handleChange}
                required
                placeholder="Enter location name"
              />
            </FormGroup>

            {/* Address */}
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter address"
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
              {/* Back Button */}
              <Button
                color="danger"
                onClick={() => navigate(-1)}
                style={{ borderRadius: '20px', padding: '0.5rem 2rem' }}
              >
                Back
              </Button>

              {/* Submit Button with Spinner */}
              <Button type="submit" color="primary" disabled={loading} style={{ borderRadius: '20px' }}>
                {loading ? (
                  <>
                    <Spinner size="sm" /> Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AddDeviceLocation;
