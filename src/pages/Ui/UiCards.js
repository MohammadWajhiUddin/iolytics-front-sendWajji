import React, { useEffect, useState } from "react"
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
} from "reactstrap"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import axios from "axios"

// import images
import img1 from "../../assets/images/small/img-1.jpg"

const UiCards = props => {
  const [overallData, setOverallData] = useState([])

  const breadcrumbItems = [
    { title: "IOLYTICS", link: "#" },
    { title: "Machines", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("", breadcrumbItems)

    const data = localStorage.getItem("authUser")
    if (data) {
      try {
        const parsedData = JSON.parse(data)
        callingApiData(parsedData.clientId)
      } catch (error) {
        console.error("Failed to parse authUser data:", error)
      }
    } else {
      console.log("No authUser data found in localStorage")
    }
  }, [props])

  const callingApiData = clientId => {
    axios
      .post(
        "https://tapi.qastco.co.uk:3221/api/machinecategory/GetCategorisemachine",
        {
          clientId: clientId,
          userId: "",
        },
      )
      .then(response => {
        setOverallData(response?.data?.clientmachinescategory || [])
      })
      .catch(error => {
        console.log(error)
      })
  }
  const formatDate = dateString => {
    const date = new Date(dateString)
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
    return date.toLocaleString("en-US", options)
  }

  return (
    <React.Fragment>
      <Row>
        {overallData.length > 0 ? (
          overallData.map((item, index) => (
            <Col mg={6} lg={6} xl={3} key={index}>
              <Card>
                <CardImg top className="img-fluid" src={img1} alt="Machine" />
                <CardBody>
                  <CardTitle className="h4">{"Name :-" + item.name}</CardTitle>
                  <CardText style={{ fontWeight: "bold", color: "blueviolet" }}>
                    {"Category :-" + item.category}
                  </CardText>
                  <CardText>
                    {"Last Temperature:- " + item.lasttemperature}
                  </CardText>
                  <CardText>
                    {"Last Temperature Date:- " +
                      formatDate(item.lasttemperaturedate)}
                  </CardText>

                  <Link
                    to={`/SingleMachine/${item.machineId}/${item.name}`}
                    className="btn btn-primary waves-effect waves-light"
                  >
                    View Details
                  </Link>
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(UiCards)
