import React from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from 'react-apexcharts';

const MonthlyEarnings = (data) => {
    console.log("eee",data.data)
    const series = [
        {
          name: 'totalUpAlert',
          data: data.data.map(entry => parseInt(entry.totalUpAlert))
        },
        {
          name: 'totaldownAlert',
          data: data.data.map(entry => parseInt(entry.totaldownAlert))
        }
      ];
      

      const totalUpAlertCount = series[0].data.reduce((acc, value) => acc + value, 0);
const totalDownAlertCount = series[1].data.reduce((acc, value) => acc + value, 0);
    const options = {
        colors: ['#28bbe3', '#F0F1F4'],
        chart: {
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '70%',
            },
        },
        grid: {
            borderColor: '#f8f8fa',
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },

        xaxis: {
            categories: data.data.map(entry => new Date(entry.Date).toLocaleDateString()),
            
            labels: {
                formatter: function (val) {
                    return val
                },
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val
                }
            }
        },
        fill: {
            opacity: 1
        },

        legend: {
            show: false,
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    };



    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Weekly Alert </h4>

                    <Row className="text-center mt-4">
                        <Col xs="6">
                            <h5 className="font-size-20">{totalUpAlertCount}</h5>
                            <p className="text-muted">Total Up Alert</p>
                        </Col>
                        <Col xs="6">
                            <h5 className="font-size-20">{totalDownAlertCount}</h5>
                            <p className="text-muted">Total Down Alert</p>
                        </Col>
                    </Row>

                    <div id="morris-bar-stacked" className="morris-charts morris-charts-height" dir="ltr">
                        <ReactApexChart options={options} series={series} type="bar" height="290" />
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default MonthlyEarnings;
