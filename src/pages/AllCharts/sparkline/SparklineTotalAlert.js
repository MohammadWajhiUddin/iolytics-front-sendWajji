import React from "react"
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines"

const SparklineTotalAlert = data => {


  const extractAlerts = data => {
    let totalAlerts = []
    let totalCount = 0;

    data.data.forEach(item => {
        const alertValue = parseInt(item.totalAlert);
      totalAlerts.push(parseInt(item.totalAlert))
      totalCount += alertValue;

    })

    return {totalAlerts,totalCount }
  }

  const result= extractAlerts(data)

  return (
    <React.Fragment>
      <div className="wid-peity mb-4">
        <div className="row">
          <div className="col-md-3">
            <div>
              <p className="text-muted">All Alerts</p>
              <h5 className="mb-4">{result.totalCount}</h5>
            </div>
          </div>
          <div className="col-md-9">
            <div className="mb-4">
              <Sparklines data={result.totalAlerts} width={100} height={33}>
                <SparklinesLine
                  style={{
                    stroke: "rgba(2, 164, 153,0.8)",
                    fill: "rgba(2, 164, 153,0.8)",
                  }}
                />
                <SparklinesSpots style={{ fill: "rgba(2, 164, 153,0.3)" }} />
              </Sparklines>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SparklineTotalAlert
