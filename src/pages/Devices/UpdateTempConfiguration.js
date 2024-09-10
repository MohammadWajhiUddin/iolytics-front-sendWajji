import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col ,Card} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateTempConfiguration = () => {
  const [formData, setFormData] = useState({
    logRetake: 55,
    tempUpLimit: 33,
    tempDownLimit: 22,
    batteryLimit: 35,
    wifiLimit: 36,
    gmtOffsetMin: 60,
    configDevicePause: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <Container>
            <Row className="justify-content-center mt-5">
            <Card>
                <Col md={12}>
                <h2 className="text-center mb-4 mt-4">Update Device Configuration</h2>
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
                    <Button color="primary" type="submit" block className="text-center mb-4 mt-4">Update Configuration</Button>
                </Form>
                </Col>
             </Card>
            </Row>
    </Container>
  );
};

export default UpdateTempConfiguration;
