import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col, Container, Spinner, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const ConfigureLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { device_id, user_id, device_name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching data from the API
    const fetchConfigLogs = async () => {
      try {
        const response = await fetch('https://tempin.qastco.co.uk:3231/api/log/getconfiglog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            devicepkId: parseInt(device_id),
            userId: user_id
          }),
        });

        const data = await response.json();
        setLogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching configuration logs:', error);
        setLoading(false);
      }
    };

    fetchConfigLogs();
  }, [device_id, user_id]);

  if (loading) {
    return <div className="text-center"><Spinner /> Loading...</div>;
  }

  return (
    <Container>
      <Button color="primary" onClick={() => navigate(-1)} className="mb-4">
        &larr; Back
      </Button>
      <h2 className="text-center my-4">{device_name} Config Log</h2>
      <Row>
        {logs.map((log) => (
          <Col xs="12" sm="6" md="4" key={log.configlogId} className="mb-4">
            <Card className="bg-light border-primary">
              <CardBody>
                <CardTitle tag="h5" className="text-primary">{log.deviceName}</CardTitle>
                <CardText>
                  <strong>Device ID:</strong> <span className="text-info">{log.deviceId}</span><br/>
                  <strong>Next Config Take:</strong> {log.nextConfigTake}<br/>
                  <strong>Log Retake:</strong> {log.logRetake}<br/>
                  <strong>Temperature Up Limit:</strong> <span className="text-danger">{log.tempUpLimit}°C</span><br/>
                  <strong>Temperature Down Limit:</strong> <span className="text-danger">{log.tempDownLimit}°C</span><br/>
                  <strong>Battery Limit:</strong> <span className="text-warning">{log.batteryLimit}%</span><br/>
                  <strong>Wi-Fi Limit:</strong> <span className="text-warning">{log.wifiLimit}%</span><br/>
                  <strong>GMT Offset:</strong> {log.gmtOffsetMin} minutes<br/>
                  <strong>Device Pause:</strong> <span className={log.configDevicePause ? 'text-success' : 'text-muted'}>{log.configDevicePause ? 'Yes' : 'No'}</span><br/>
                  <strong>Hot Config With Log:</strong> <span className={log.hotConfigWithLog ? 'text-success' : 'text-muted'}>{log.hotConfigWithLog ? 'Yes' : 'No'}</span><br/>
                                <strong>Hot Config With Log:</strong> <span className={log.hotConfigWithLog ? 'text-success' : 'text-muted'}>{log.hotConfigWithLog ? 'Yes' : 'No'}</span><br/>
                                <strong>Created At:</strong> 
                                {new Date(log.createdAt).toLocaleString()}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ConfigureLogs;
