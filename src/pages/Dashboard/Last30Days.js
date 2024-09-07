import React, { Component } from "react"
import { Row, Col, Card, CardBody, Label } from "reactstrap"
import ReactApexChart from "react-apexcharts"

const Last30Days = ({ data }) => {
  
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
                      filldata.push(it.AVGTEMP);
                    }              
                  return 0;
              });

             
              xAxisdata=[];
                for(var o in linedata) //fill points
                { 
                  
                    if(o.machineId === item.machineId)
                      {
                        filldata.push(o.AVGTEMP);
                        xAxisdata.push(o.date);


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
      categories: data?.map(data => new Date(data.date).toLocaleDateString()),

      title: { text: "Hours" },
    },
    yaxis: { title: { text: "Temperature" } },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: !0,
      offsetY: -25,
      offsetX: -5,
    },
    responsive: [
      {
        breakpoint: 600,
        options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
      },
    ],
  }

  return (
    <React.Fragment>
      <Card style={{height:380}}>
        <CardBody>
          <h4 className="card-title mb-4">Month Average Temperature</h4>

    

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

export default Last30Days