import React, { useEffect, useState } from 'react';
import { Card, Spinner, Row, Col,CardBody, CardFooter,Button } from 'reactstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useNavigate,useParams } from 'react-router-dom';

const TempConfiguration = () => {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);

    const {device_id,user_id} = useParams()

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the device temperature configuration
        const fetchDeviceConfig = async () => {
            console.log("device id ",device_id)
            console.log("user id ",user_id)

          try {
            const response = await fetch('https://tempin.qastco.co.uk:3231/api/insight/getdevicetempconfig', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                Id:parseInt(device_id),
                userId:String(user_id),
              }),
            });
    
            const data = await response.json();
            if (data.success) {
                setData(data.getDeviceTempConfig);
            }
          } catch (error) {
            console.error('Error fetching device config:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchDeviceConfig();
    }, []);
    
    if (loading) {
        return (
          <div className="text-center my-5">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        );
    }

    return (
      <div className="container mt-5">
                    <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Device Configuration</h2>

                {data && (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                <CardBody className="bg-primary text-white text-center">
                  <h5>{data.deviceName}</h5>
                </CardBody>
                <CardBody>
                  <Row className="mb-3">
                    <Col><strong>Device ID:</strong></Col>
                    <Col>{data.deviceId}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col><strong>Log Retake:</strong></Col>
                    <Col>{data.logRetake} mins</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col><strong>Temperature Upper Limit:</strong></Col>
                    <Col>{data.tempUpLimit}°C</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col><strong>Temperature Lower Limit:</strong></Col>
                    <Col>{data.tempDownLimit}°C</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col><strong>Battery Limit:</strong></Col>
                    <Col>{data.batteryLimit}%</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col><strong>Wi-Fi Limit:</strong></Col>
                    <Col>{data.wifiLimit}%</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col><strong>GMT Offset:</strong></Col>
                    <Col>{data.gmtOffsetMin} mins</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col><strong>Pause Configuration:</strong></Col>
                    <Col>{data.configDevicePause === 0 ? 'No' : 'Yes'}</Col>
                  </Row>
                </CardBody>
                <CardFooter>
                <div className="text-center">
                <Button
                  color="primary"
                  onClick={() => navigate(-1)}
                  style={{ borderRadius: '20px', padding: '0.5rem 2rem' }}
                >
                  Back
                </Button>
              </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
                )}
      
      </div>
    );
}

export default TempConfiguration;
