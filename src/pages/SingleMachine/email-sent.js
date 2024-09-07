import React, { Component } from "react"
import { Row, Col, Card, CardBody, Label } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import { array } from "prop-types"

const MonthlyEarnings = ({ data, data2 }) => {
  
  var fridges = [];
  var xAxisdata = [];
  function getLinedata(linedata) {    

    for(var i in linedata) {      //iterate on data receive

      var item = linedata[i]; 

      var exist=false;
       
          for(var f in fridges) //check here existance
            {
            
              if(item.machineId === fridges[f].machineId)
                {
                  exist=true;
                }
            } 

            if(!exist)   //if not exist push in array
              {   
                var filldata=[];
                const usersByLikes = linedata.map(it => {
                  if(it.machineId === item.machineId)
                    {
                      filldata.push(it.avgtemp);
                    }              
                  return 0;
              });

             
              xAxisdata=[];
                for(var o in linedata) //fill points
                { 
                  
                    if(o.machineId === item.machineId)
                      {
                        filldata.push(o.avgtemp);
                        xAxisdata.push(o.hour);

                      }

                }
                fridges.push({ 

                    "name" : item.name,                 
                    "data"  :  filldata,
                    "machineId" : item.machineId,
                });
          }
        }
    return fridges;
  }

  getLinedata(data);


  
  


  const options = {
    chart: { zoom: { enabled: !1 }, toolbar: { show: false } },
    colors: ["#556ee6", "#34c38f"],
    dataLabels: { enabled: false },
    colors: ["#556ee6", "#34c38f"],
    // dataLabels: { enabled: !0 },
    stroke: { width: [3, 3], curve: "straight" },
    grid: {
      row: { colors: ["transparent", "transparent"], opacity: 0.2 },
      borderColor: "#f1f1f1",
    },
    markers: { style: "inverted", size: 6 },
    xaxis: {
      categories: xAxisdata,//data?.map(data => data?.hour) ,//hours,
      title: { text: "Hours" },
    },
    yaxis: { title: { text: "Temperature" } },
 
  
  }

  return (
    <React.Fragment>
      <Card style={{height:450}}>
        <CardBody>
          <h4 className="card-title mb-4">24 Hours Temperature Data</h4>

          <Row className="text-center mt-4">
            <Col xs="4">
              <h5 className="font-size-20">{data2[0]?.mintemp} °C</h5>
              <p className="text-muted">Minimum </p>
            </Col>
            <Col xs="4">
              <h5 className="font-size-20">{data2[0]?.maxtemp} °C</h5>
              <p className="text-muted">Maximum </p>
            </Col>
            <Col xs="4">
              <h5 className="font-size-20">{data2[0]?.avgtemp} °C</h5>
              <p className="text-muted">Average </p>
            </Col>
          </Row>

          <div
            id="morris-area-example"
            className="morris-charts morris-charts-height"
            dir="ltr"
          >
            <ReactApexChart
              options={options}
              series={fridges}//{series}
              type="line"
              height="320"
              // className="apexcharts-canvas apexchartscq310u9c apexcharts-theme-light"
            />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarnings