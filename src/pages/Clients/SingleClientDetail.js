import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Button,
  Spinner,
} from "reactstrap";

const SingleClientDetail = () => {
  const navigate = useNavigate();
  const { client_id, user_id } = useParams();
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://tempin.qastco.co.uk:3231/api/client/getbyid",
          {
            userId: user_id,
            clientId: client_id,
          }
        );
        setClientData(response.data);
      } catch (error) {
        console.error("Error fetching client data", error);
      }
    };

    fetchData();
  }, [client_id, user_id]);

  if (!clientData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spinner color="primary" />
        <p style={{ marginLeft: '1rem' }}>Loading client details...</p>
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '2rem', backgroundColor: '#f9f9f9' }}>
            <CardBody>
              <CardTitle tag="h2" style={{ color: '#007bff', fontWeight: 'bold', textAlign: 'center' }}>
                {clientData.clientname}
              </CardTitle>
              <CardText style={{ fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <strong>Website:</strong>{" "}
                <a href={clientData.clientWebsite} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                  {clientData.clientWebsite}
                </a>
              </CardText>
              <Row className="mb-3">
                <Col xs={6}>
                  <CardText>
                    <strong>Company Name:</strong> {clientData.clientCompanyname}
                  </CardText>
                </Col>
                <Col xs={6}>
                  <CardText>
                    <strong>Created At:</strong> {new Date(clientData.createdAt).toLocaleDateString()}
                  </CardText>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6}>
                  <CardText>
                    <strong>Created By ID:</strong> {clientData.createdById}
                  </CardText>
                </Col>
                <Col xs={6}>
                  <CardText>
                    <strong>Updated At:</strong>{" "}
                    {clientData.updatedAt
                      ? new Date(clientData.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </CardText>
                </Col>
              </Row>

              <div className="text-center">
                <Button
                  color="primary"
                  onClick={() => navigate(-1)}
                  style={{ borderRadius: '20px', padding: '0.5rem 2rem' }}
                >
                  Back
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleClientDetail;
