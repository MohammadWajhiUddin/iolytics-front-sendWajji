import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"

import Knob from "../AllCharts/knob/knob"

const AlertsKnob = ({ thismonth, lastMonth }) => {
  useEffect(() => {})

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <Card style={{ height: 380 }}>
            <CardBody>
              <h4 className="card-title">Temperature Average</h4>

              <Row>
                <Col lg="6">
                  <div className="text-center" dir="ltr" style={{marginTop:50}}>
                    <h5 className="font-size-20 mb-3">This Month Temp</h5>
                    <p className="card-title-desc">{thismonth} Within Range</p>
                    <Knob
                      value={thismonth}
                      height={200}
                      width={150}
                      fgColor="#7a6fbe"
                      displayCustom={() => {
                        return false
                      }}
                    />
                  </div>
                </Col>
                <Col lg="6">
                  <div className="text-center" dir="ltr" style={{marginTop:50}}>
                    <h5 className="font-size-20 mb-3">Last Month Temp</h5>
                    <p className="card-title-desc">{lastMonth} Within Range</p>
                    <Knob
                      value={lastMonth}
                      height={200}
                      width={150}
                      fgColor="#7a6fbe"
                      displayCustom={() => {
                        return false
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default AlertsKnob
