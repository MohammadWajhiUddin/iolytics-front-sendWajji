import React, { useEffect } from "react";
import { Col, Row, Card, CardBody, CardTitle, CardImg, CardText, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllClients } from "../../Slices/ClientSlices";
import { useNavigate } from "react-router-dom";

// Import images
import img1 from "../../assets/images/small/img-1.jpg";

const ViewAllClients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.authenticateUser.user);
  const clients = useSelector(state => state.ClientDetails.Clients); // Assuming clients are stored here

  useEffect(() => {
    if (users.userId) {
      const UserId = { UserId: users.userId };
      dispatch(getAllClients(UserId));
    }
  }, [dispatch, users.userId]);

  const handleViewDetails = (clientId, userId) => {
    navigate(`/SingleClientDetail/${clientId}/${userId}`);
  };

  const handleAddClient = () => {
    navigate('/AddClient');
  };

  const handleUpdateClient = (clientId, userId) => {
    navigate(`/UpdateClientForm/${clientId}/${userId}`);
  };

  const handleClientLocation = (clientId, userId) => {
    navigate(`/DeviceLocation/${clientId}/${userId}`);
  };

  return (
    <React.Fragment>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Clients</h2>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Button
          onClick={handleAddClient}
          color="primary"
          style={{ padding: '.5rem 1rem', width: '100%' }}
        >
          Add New Client
        </Button>
      </div>

      <Row>
        {clients && clients.length > 0 ? (
          clients.map((client, index) => (
            <Col key={index} md={6} lg={4} xl={3} style={{ marginBottom: '1rem' }}>
              <Card>
                <CardImg top className="img-fluid" src={img1} alt="Client" />
                <CardBody>
                  <CardTitle tag="h4">{client.name}</CardTitle>
                  <CardText style={{ fontWeight: "bold", color: "blueviolet" }}>
                    {client.clientname} {/* Display client email */}
                  </CardText>
                  <CardText>
                    {client.clientCompanyname} {/* Display client company name */}
                  </CardText>
                  <CardText>
                    {client.clientWebsite} {/* Display client website */}
                  </CardText>
                  <div className="d-flex justify-content-between">
                    <Button
                      onClick={() => handleViewDetails(client.clientId, users.userId)}
                      color="info"
                      style={{ flex: 1, marginRight: '.5rem' }}
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleUpdateClient(client.clientId, users.userId)}
                      color="warning"
                      style={{ flex: 1, marginRight: '.5rem' }}
                    >
                      Update Client
                    </Button>
                    <Button
                      onClick={() => handleClientLocation(client.clientId, users.userId)}
                      color="danger"
                      style={{ flex: 1 }}
                    >
                      Devices Location
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No clients found</p>
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};

export default ViewAllClients;
