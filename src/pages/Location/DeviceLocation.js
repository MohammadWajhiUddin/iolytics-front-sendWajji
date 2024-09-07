import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllClientsDevicesLocation,SingleLocationDetails } from "../../Slices/DevicesLocationSlice";
import { useParams, useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

const DeviceLocation = () => {
  const { client_id, user_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation
  const locations = useSelector((state) => state.clientLocation.DeviceLocation);
  const status = useSelector((state) => state.clientLocation.status);
  const error = useSelector((state) => state.clientLocation.error);

  useEffect(() => {
    if (client_id && user_id) {
      dispatch(
        getAllClientsDevicesLocation({ userId: user_id, clientId: client_id })
      );
    }
  }, [dispatch, client_id, user_id]);

  // Debugging statements
  console.log("Locations:", locations);
  console.log("Status:", status);
  console.log("Error:", error);

  // Handler for adding a new device
  const handleAddDevice = () => {
    navigate(`/AddDeviceLocation/${client_id}/${user_id}`) 
   };

  // Handler for viewing location details
  const handleViewLocation = (location) => {
    dispatch(SingleLocationDetails(location))
    navigate('/ViewLocationDetails')
  };

  // Handler for updating location
  const handleUpdateLocation = (location,location_id) => {
    dispatch(SingleLocationDetails(location))
    navigate(`/UpdateDeviceLocation/${client_id}/${user_id}/${location_id}`);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Button color="primary" className="mb-4" onClick={handleAddDevice}>
            Add New Location For Device
          </Button>
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>Error: {error}</p>}
          {status === "succeeded" && locations.length > 0 ? (
            locations.map((location) => (
              <Card key={location.id} className="mb-3">
                <CardBody>
                  <CardTitle tag="h2">{location.locationname}</CardTitle>
                  <CardText>
                    <strong>Address:</strong> {location.address}
                  </CardText>
                  <CardText>
                    <strong>Updated At:</strong>{" "}
                    {new Date(location.updatedAt).toLocaleDateString()}
                  </CardText>
                  <CardText>
                    <strong>Created At:</strong>{" "}
                    {new Date(location.createdAt).toLocaleDateString()}
                  </CardText>
                  <Button
                    color="info"
                    className="me-2"
                    onClick={() => handleViewLocation(location)}
                  >
                    View Location Details
                  </Button>
                  <Button
                    color="warning"
                    onClick={() => handleUpdateLocation(location,location.id)}
                  >
                    Update Location
                  </Button>
                </CardBody>
              </Card>
            ))
          ) : (
            <p>No locations found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DeviceLocation;
