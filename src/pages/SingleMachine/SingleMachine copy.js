import React, { useEffect, useState } from "react"

import { connect } from "react-redux"
import { Row, Col, Card, CardBody } from "reactstrap"

// Pages Components
import Miniwidget from "../Dashboard/Miniwidget"
import MonthlyEarnings from "../Dashboard/montly-earnings"
import EmailSent from "../Dashboard/email-sent"
import MonthlyEarnings2 from "../Dashboard/montly-earnings2"

import SparkLineTotalAlert from "pages/AllCharts/sparkline/SparklineTotalAlert"
import SparklineUpAlert from "pages/AllCharts/sparkline/SparkLineUpAlert"
import SparklineDownAlert from "pages/AllCharts/sparkline/SparkLineDownAlert"

import Last30Days from "../Dashboard/Last30Days"
import AlertsKnob from "../Dashboard/AlertsKnob"

import loadingimage from "../../assets/images/loading.gif"

//Import Action to copy breadcrumb items from local state to redux state
import axios from "axios"

const SingleMachine = props => {
  const [topLevelArray, setTopLevelArray] = useState([])
  const [allAlerts, setAllAlerts] = useState([])
  const [overallData, setOverallData] = useState([])
  const [loading, setLoading] = useState(false)
  const [upalert, setUpAlert] = useState(null)
  const [downalert, setDownAlert] = useState(null)
  const [hourTemperatureL2C2, setHourTemperatureL2C2] = useState([])
  const [minmaxavgTemperatureL2C2_1, setminmaxavgTemperatureL2C2_1] = useState(
    [],
  )
  const [clientid, setClientId] = useState(null)
  const [daysAlert, setdaysAlert] = useState([])
  const [monthlyData, setMonthlyData] = useState([])

  const [thisMonthAlert, setThisMonthAlert] = useState(null)
  const [lastMonthAlert, setLastMonthAlert] = useState(null)
  const [allAlerLast30DaysL3C3, setAllAlerLast30DaysL3C3] = useState([])
  const [allUpAlerLast30DaysL3C3, setAllUpAlerLast30DaysL3C3] = useState([])
  const [allDownAlerLast30DaysL3C3, setAllDownAlerLast30DaysL3C3] = useState([])


 
  useEffect(() => {
    const data = localStorage.getItem("authUser")
    if (data) {
      try {
        const parsedData = JSON.parse(data)
        setClientId(parsedData.clientId)
      } catch (error) {
        console.error("Failed to parse authUser data:", error)
      }
    } else {
      console.log("No authUser data found in localStorage")
    }

    setLoading(true)
    console.log(clientid)
    axios
      .post("https://tapi.qastco.co.uk:3221/api/temperature/getDashboard", {
        // client_id:String(clientid),
        client_id: "3309c269-40ba-48f2-9bfd-3a32e3151ddd",
        user_Id: "",
      })
      .then(function (response) {
        setOverallData(response.data)
        generateTopLevelReport(response.data)
        generateAlerts(response.data)
        setHourTemperatureL2C2(response.data.hourTemperatureL2C2)
        setminmaxavgTemperatureL2C2_1(response.data.minmaxavgTemperatureL2C2_1)
        setdaysAlert(response.data.daysAlertL2C3)
        setMonthlyData(response.data.last30daysavgTempL3C1)
        setThisMonthAlert(response?.data?.thismonthTempL3C2[0].thisMonthTemp)
        setLastMonthAlert(response?.data?.lastmonthTempL3C3[0].lastMonthTemp)
        setAllAlerLast30DaysL3C3(response?.data?.allAlerLast30DaysL3C3)
        setAllUpAlerLast30DaysL3C3(response?.data?.allUpAlerLast30DaysL3C3)
        setAllDownAlerLast30DaysL3C3(response?.data?.allDownAlerLast30DaysL3C3)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const generateTopLevelReport = data => {
    let totalofconnectivity = 0
    let totalofTemperature = 0
    let totaltopUpTemperatureAlertL1 = 0
    let totaltopDownTemperatureAlertL1 = 0

    for (let item of data.topConnectivityL1) {
      if (parseInt(item.count) > 0) {
        totalofconnectivity++
      }
    }

    for (let item of data.topTemperatureL1) {
      if (parseInt(item.count) > 0) {
        totalofTemperature++
      }
    }

    for (let item of data.topUpTemperatureAlertL1) {
      if (parseInt(item.count) > 0) {
        totaltopUpTemperatureAlertL1++
      }
    }

    for (let item of data.topDownTemperatureAlertL1) {
      if (parseInt(item.count) > 0) {
        totaltopDownTemperatureAlertL1++
      }
    }

    const percentageoftopTemperatureL1 =
      (totalofTemperature / data.topTemperatureL1.length) * 100
    const percentageofConnectivity =
      (totalofconnectivity / data.topConnectivityL1.length) * 100
    const percentageofAlert =
      (totaltopUpTemperatureAlertL1 / data.topUpTemperatureAlertL1.length) * 100
    const percentageofDownTemperatureAlert =
      (totaltopDownTemperatureAlertL1 / data.topDownTemperatureAlertL1.length) *
      100

    const Downtemperaturealert = {
      title: "Down Alert",
      iconClass: "alert",
      total: `${totaltopDownTemperatureAlertL1} /${data.topDownTemperatureAlertL1.length}`,
      average: `${percentageofDownTemperatureAlert} %`,
      badgecolor: "info",
    }
    const alert = {
      title: "Up Alert",
      iconClass: "alert",
      total: `${totaltopUpTemperatureAlertL1} /${data.topDownTemperatureAlertL1.length}`,
      average: `${percentageofAlert} %`,
      badgecolor: "info",
    }

    const temperature = {
      title: "Temperature",
      iconClass: "fire",
      total: `${totalofTemperature} /${data.topTemperatureL1.length}`,
      average: `${percentageoftopTemperatureL1} %`,
      badgecolor: "info",
    }

    const Connectivity = {
      title: "Connectivity",
      iconClass: "lock-check",
      total: `${totalofconnectivity} /${data.topConnectivityL1.length}`,

      average: `${percentageofConnectivity} %`,
      badgecolor: "info",
    }
    const report = [Connectivity, temperature, alert, Downtemperaturealert]

    setTopLevelArray(report)
  }

  const generateAlerts = data => {
    const AlertArray = [
      ["Freezer", data.DeviceAlertL2C1[0].count],
      ["Kitchen", data.DeviceAlertL2C1[1].count],
      ["Meet Fridge", data.DeviceAlertL2C1[2].count],
      ["Backup Freezer", data.DeviceAlertL2C1[3].count],
    ]

    setUpAlert(data.upalertAlertL2C1[0].upalert)
    setDownAlert(data.downalertAlertL2C1[0].downalert)

    setAllAlerts(AlertArray)
  }

  return (
    <React.Fragment>
      {/*mimi widgets */}

      {loading ? (
        <>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flex: 1,
            }}
          >
            <img src={loadingimage} />
          </div>
        </>
      ) : (
        <>
          <Miniwidget reports={topLevelArray} />

          <Row>
            <Col xl="3">
              {/* Monthly Earnings */}
              <MonthlyEarnings
                data1={allAlerts}
                upalert={upalert}
                downalert={downalert}
              />
            </Col>

            <Col xl="6">
              {/* Email sent */}
              <EmailSent
                data={hourTemperatureL2C2}
                data2={minmaxavgTemperatureL2C2_1}
              />
            </Col>

            <Col xl="3">
              <MonthlyEarnings2 data={daysAlert} />
            </Col>
          </Row>

          <Row>
            <Col xl="6" lg="6">
              <Last30Days data={monthlyData} />
            </Col>

            <Col xl="6" lg="6">
              <AlertsKnob
                thismonth={thisMonthAlert}
                lastMonth={lastMonthAlert}
              />
            </Col>
          </Row>

          <Row>
            <Col xl="4" lg="4">
              <Card>
                <CardBody>
                  <div>
                    <h4 className="card-title mb-4">Month Temperature</h4>
                  </div>

                  <SparkLineTotalAlert data={allAlerLast30DaysL3C3} />

                  <SparklineUpAlert data={allUpAlerLast30DaysL3C3} />

                  <SparklineDownAlert data={allDownAlerLast30DaysL3C3} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </React.Fragment>
  )
}

export default SingleMachine
