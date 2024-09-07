import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap"

const UpdateClientForm = () => {
  const { client_id, user_id } = useParams()
  const [clientData, setClientData] = useState({
    clientId: "",
    clientname: "",
    clientWebsite: "",
    clientCompanyname: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://tempin.qastco.co.uk:3231/api/client/getbyid",
          {
            userId: user_id,
            clientId: client_id,
          },
        )
        setClientData({
          clientId: response.data.clientId || "",
          clientname: response.data.clientname || "",
          clientWebsite: response.data.clientWebsite || "",
          clientCompanyname: response.data.clientCompanyname || "",
        })
      } catch (error) {
        console.error("Error fetching client data", error)
      }
    }

    fetchData()
  }, [client_id, user_id])

  const handleChange = e => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "https://tempin.qastco.co.uk:3231/api/client/update",
        {
          clientId: client_id,
          clientname: clientData.clientname,
          clientWebsite: clientData.clientWebsite,
          clientCompanyname: clientData.clientCompanyname,
          updatedById: user_id,
        },
      )
      setClientData(response.data)
      console.log("Client updated successfully", response.data)
    } catch (error) {
      console.error("Error updating client", error)
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
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

            <Button type="submit" color="primary">
              Update Client
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default UpdateClientForm
