import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  Spinner,
  Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const UpdateClientForm = () => {
  const { client_id, user_id } = useParams();
  const navigate = useNavigate();

  const [clientData, setClientData] = useState({
    clientId: "",
    clientname: "",
    clientWebsite: "",
    clientCompanyname: "",
  });

  const [loading, setLoading] = useState(false); // For handling loading state
  const [success, setSuccess] = useState(false); // For success alert
  const [error, setError] = useState(""); // For error alert

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
        setClientData({
          clientId: response.data.clientId || "",
          clientname: response.data.clientname || "",
          clientWebsite: response.data.clientWebsite || "",
          clientCompanyname: response.data.clientCompanyname || "",
        });
      } catch (error) {
        console.error("Error fetching client data", error);
        setError("Failed to fetch client data");
      }
    };

    fetchData();
  }, [client_id, user_id]);

  const handleChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    try {
      const response = await axios.post(
        "https://tempin.qastco.co.uk:3231/api/client/update",
        {
          clientId: client_id,
          clientname: clientData.clientname,
          clientWebsite: clientData.clientWebsite,
          clientCompanyname: clientData.clientCompanyname,
          updatedById: user_id,
        }
      );
      setClientData(response.data);
      setSuccess(true);
      console.log("Client updated successfully", response.data);
    } catch (error) {
      console.error("Error updating client", error);
      setError("Failed to update client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <CardHeader>
          <h4 className="card-title" style={{ textAlign: "center" }}>
            Update Client Form
          </h4>
        </CardHeader>
        <Row className="justify-content-center">
          <Col md={8}>
            {/* Success and Error Alerts */}
            {success && <Alert color="success">Client updated successfully!</Alert>}
            {error && <Alert color="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="clientname">Client Name</Label>
                <Input
                  type="text"
                  name="clientname"
                  id="clientname"
                  value={clientData.clientname}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="clientWebsite">Client Website</Label>
                <Input
                  type="text"
                  name="clientWebsite"
                  id="clientWebsite"
                  value={clientData.clientWebsite}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="clientCompanyname">Company Name</Label>
                <Input
                  type="text"
                  name="clientCompanyname"
                  id="clientCompanyname"
                  value={clientData.clientCompanyname}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <div
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <Button
                  color="danger"
                  onClick={() => navigate(-1)}
                  style={{ borderRadius: "20px", padding: "0.5rem 2rem" }}
                >
                  Back
                </Button>

                <Button color="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Update Client"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default UpdateClientForm;
