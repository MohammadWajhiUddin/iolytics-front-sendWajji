import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col, Container, Spinner, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const TempLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { device_id, user_id, device_name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching data from the API
    const fetchTempLogs = async () => {
      try {
        const response = await fetch('https://tempin.qastco.co.uk:3231/api/log/gettemplog', {
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
        console.error('Error fetching temperature logs:', error);
        setLoading(false);
      }
    };

    fetchTempLogs();
  }, [device_id, user_id]);

  if (loading) {
    return <div className="text-center"><Spinner /> Loading...</div>;
  }

  return (
    <Container>
      <Button color="primary" onClick={() => navigate(-1)} className="mb-4">
        &larr; Back
      </Button>
      <h2 className="text-center my-4">{device_name} Temp Log</h2>
      <Row>
        {logs.map((log) => (
          <Col xs="12" sm="6" md="4" key={log.tempLogId} className="mb-4">
            <Card className="bg-light border-primary">
              <CardBody>
                <CardTitle tag="h5" className="text-primary">{log.deviceName}</CardTitle>
                <CardText>
                  <strong>Device ID:</strong> <span className="text-info">{log.deviceId}</span><br/>
                  <strong>Temperature (C):</strong> <span className="text-danger">{log.temperatureC}°C</span><br/>
                  <strong>Temperature (F):</strong> <span className="text-danger">{log.temperatureF}°F</span><br/>
                  <strong>Next Temp Take:</strong> {log.nextTempTake}<br/>
                  <strong>Battery Level:</strong> <span className="text-warning">{log.batteryLevel}V</span><br/>
                  <strong>Wi-Fi Level:</strong> <span className="text-warning">{log.wifiLevel}%</span><br/>
                  <strong>Temp Alert:</strong> <span className={log.tempalert ? 'text-success' : 'text-muted'}>{log.tempalert ? 'Yes' : 'No'}</span><br/>
                  <strong>Range Out Count:</strong> <span className="text-danger">{log.rangeoutCount}</span><br/>
                  <strong>Battery Alert:</strong> <span className={log.batteryLevelAlert ? 'text-success' : 'text-muted'}>{log.batteryLevelAlert ? 'Yes' : 'No'}</span><br/>
                  <strong>Wi-Fi Alert:</strong> <span className={log.wifiLevelAlert ? 'text-success' : 'text-muted'}>{log.wifiLevelAlert ? 'Yes' : 'No'}</span><br/>
                  <strong>Created At:</strong> 
                  {new Date(log.createdAt).toLocaleString()}
                  <br/>

                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TempLogs;
