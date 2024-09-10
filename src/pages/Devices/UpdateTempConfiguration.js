import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col, Card, Spinner, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UpdateTempConfiguration = () => {
  const deviceTempData = useSelector((state) => state.TempConfig.DeviceTempConfigData);
const userID  = useSelector((state) => state.authenticateUser.user.userId);
  const [formData, setFormData] = useState({
    logRetake: '',
    tempUpLimit: '',
    tempDownLimit: '',
    batteryLimit: '',
    wifiLimit: '',
    gmtOffsetMin: '',
    configDevicePause: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
console.log("userid",userID)
  useEffect(() => {
    // Initialize form data with values from Redux store
    setFormData({
      logRetake: deviceTempData.logRetake,
      tempUpLimit: deviceTempData.tempUpLimit,
      tempDownLimit: deviceTempData.tempDownLimit,
      batteryLimit: deviceTempData.batteryLimit,
      wifiLimit: deviceTempData.wifiLimit,
      gmtOffsetMin: deviceTempData.gmtOffsetMin,
      configDevicePause: true,
    });
  }, [deviceTempData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');


    
    try {
      const response = await axios.post('https://tempin.qastco.co.uk:3231/api/insight/updatedevicetempconfig', 
       {
        Id: Number(deviceTempData.id), 
        deviceId: deviceTempData.deviceId, 
        deviceName: deviceTempData.deviceName, 
        logRetake: Number(formData.logRetake) || 0,
        tempUpLimit: Number(formData.tempUpLimit) || 0, 
        tempDownLimit: Number(formData.tempDownLimit) || 0,
        batteryLimit: Number(formData.batteryLimit) || 0, 
        wifiLimit: Number(formData.wifiLimit) || 0, 
        gmtOffsetMin: Number(formData.gmtOffsetMin) || 0, 
        configDevicePause: formData.configDevicePause, 
        userId: userID
       }
      );

      console.log("Response from an api",response)
      
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
        console.error("Error submitting form:", error.response?.data || error.message);
      setError('Failed to update configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={12}>
          <Card body>
            <h2 className="text-center mb-4 mt-4">Update {deviceTempData.deviceName} Device Configuration</h2>
            {success && <Alert color="success">Data updated successfully!</Alert>}
            {error && <Alert color="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="logRetake">Log Retake (minutes)</Label>
                <Input
                  type="number"
                  name="logRetake"
                  id="logRetake"
                  value={formData.logRetake}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="tempUpLimit">Temperature Upper Limit (°C)</Label>
                <Input
                  type="number"
                  name="tempUpLimit"
                  id="tempUpLimit"
                  value={formData.tempUpLimit}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="tempDownLimit">Temperature Lower Limit (°C)</Label>
                <Input
                  type="number"
                  name="tempDownLimit"
                  id="tempDownLimit"
                  value={formData.tempDownLimit}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="batteryLimit">Battery Limit (%)</Label>
                <Input
                  type="number"
                  name="batteryLimit"
                  id="batteryLimit"
                  value={formData.batteryLimit}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="wifiLimit">WiFi Signal Limit (%)</Label>
                <Input
                  type="number"
                  name="wifiLimit"
                  id="wifiLimit"
                  value={formData.wifiLimit}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="gmtOffsetMin">GMT Offset (minutes)</Label>
                <Input
                  type="number"
                  name="gmtOffsetMin"
                  id="gmtOffsetMin"
                  value={formData.gmtOffsetMin}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="configDevicePause"
                    id="configDevicePause"
                    checked={formData.configDevicePause}
                    onChange={handleChange}
                  />{' '}
                  Pause Device Configuration
                </Label>
              </FormGroup>
              <Button color="primary" type="submit" block disabled={loading}>
                {loading ? <Spinner size="sm" /> : 'Update Configuration'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateTempConfiguration;
