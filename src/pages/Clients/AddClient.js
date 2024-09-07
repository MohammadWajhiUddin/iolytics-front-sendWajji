import React, { useEffect,useState } from "react"
import { Card, CardBody, Col, Row, Form, Button, Spinner, Alert } from "reactstrap"
import { useSelector, useDispatch } from "react-redux"
import { createClient, resetSuccess } from "Slices/ClientSlices"

const AddClient = () => {
  const dispatch = useDispatch()
  const id = useSelector(state => state.authenticateUser.user)
  const { loading, success } = useSelector(state => state.ClientDetails) // Assuming state.client holds client-related data

  const [clientName, setClientName] = useState("")
  const [clientWebsite, setClientWebsite] = useState("")
  const [clientCompanyName, setClientCompanyName] = useState("")

  const handleSubmit = e => {
    e.preventDefault()

    const clientData = {
      clientname: clientName,
      clientWebsite: clientWebsite,
      clientCompanyname: clientCompanyName,
      createdById: id.userId,
    }

    dispatch(createClient(clientData))
  }

  useEffect(() => {
    if (success) {
      alert("Client created successfully!")
      dispatch(resetSuccess()) // Reset success state after alert
      setClientName("")
      setClientWebsite("")
      setClientCompanyName("")
    }
  }, [success, dispatch])

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <h4 className="card-title">Add Clients</h4>

            <Row>
              <Col lg={12}>
                <div className="mt-4">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={12}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="formrow-firstname-input"
                          >
                            Client Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-input"
                            placeholder="Enter Client name"
                            value={clientName}
                            onChange={e => setClientName(e.target.value)}
                          />
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="formrow-email-input"
                          >
                            Client Website
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="formrow-email-input"
                            placeholder="Enter Client Website"
                            value={clientWebsite}
                            onChange={e => setClientWebsite(e.target.value)}
                          />
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="formrow-password-input"
                          >
                            Client Company Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="formrow-password-input"
                            placeholder="Enter Company Name"
                            value={clientCompanyName}
                            onChange={e => setClientCompanyName(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="mt-4">
                      <Button type="submit" color="primary" block disabled={loading}>
                        {loading ? <Spinner size="sm" /> : "Submit"}
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default AddClient
