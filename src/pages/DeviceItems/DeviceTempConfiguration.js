import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'reactstrap'; // If using Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';   // Ensure Bootstrap is imported
const DeviceTempConfiguration = () => {
  const [deviceConfig, setDeviceConfig] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log("Called")
    // Fetch the device temperature configuration
    const fetchDeviceConfig = async () => {
      try {
        const response = await fetch('https://tempin.qastco.co.uk:3231/api/insight/getdevicetempconfig', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Id: 8,
            userId: 'b4626d99-2f7a-498f-9411-ca669a91a86a',
          }),
        });

        const data = await response.json();
        if (data.success) {
          setDeviceConfig(data.getDeviceTempConfig);
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
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }


  return (
    <div className="container mt-5">
    {deviceConfig && (
      <Card>
        <Card.Header as="h5">{deviceConfig.deviceName}</Card.Header>
        <Card.Body>
          <Card.Text><strong>Device ID:</strong> {deviceConfig.deviceId}</Card.Text>
          <Card.Text><strong>Log Retake:</strong> {deviceConfig.logRetake} mins</Card.Text>
          <Card.Text><strong>Temperature Upper Limit:</strong> {deviceConfig.tempUpLimit}°C</Card.Text>
          <Card.Text><strong>Temperature Lower Limit:</strong> {deviceConfig.tempDownLimit}°C</Card.Text>
          <Card.Text><strong>Battery Limit:</strong> {deviceConfig.batteryLimit}%</Card.Text>
          <Card.Text><strong>Wi-Fi Limit:</strong> {deviceConfig.wifiLimit}%</Card.Text>
          <Card.Text><strong>GMT Offset:</strong> {deviceConfig.gmtOffsetMin} mins</Card.Text>
          <Card.Text><strong>Pause Configuration:</strong> {deviceConfig.configDevicePause === 0 ? 'No' : 'Yes'}</Card.Text>
        </Card.Body>
      </Card>
    )}
  </div>
   
)
}

export default DeviceTempConfiguration