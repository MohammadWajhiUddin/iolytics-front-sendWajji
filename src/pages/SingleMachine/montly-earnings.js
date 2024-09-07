import React from "react"
import { Card, CardBody, Row,  CardTitle } from "reactstrap"
import DonutChart from '../AllCharts/DonutChart';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
const MonthlyEarnings = ({data1,upalert,downalert}) => {
    const data = {
        columns: data1,
        type: "donut",
    };

    const donut = {
        title: "Alerts",
        width: 30,
        label: { show:false }
    };

    const color = {
        pattern: ['#f0f1f4', '#7a6fbe', '#28bbe3']
    };

    const size = {
        height: 300
    };

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="h4 mb-4">Alert Report</CardTitle>

                    <Row className="text-center mt-4">
                        <div className="col-6">
                            <h5 className="font-size-20">{upalert}</h5>
                            <p className="text-muted">Up alert</p>
                        </div>
                        <div className="col-6">
                            <h5 className="font-size-20">{downalert}</h5>
                            <p className="text-muted">Down Alert </p>
                        </div>
                    </Row>
                    <div dir="ltr">
                             <C3Chart data={data} donut={donut} color={color} size={size} dir="ltr" />

                    </div>

                </CardBody>
            </Card>
        </React.Fragment>
    )

}

export default MonthlyEarnings
