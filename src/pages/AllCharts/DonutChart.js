import React from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

const DonutChart = (props) => {
    console.log("Props",props.data)
    const data = {
        columns: props.data,
        
        type: "donut",
    };

    const donut = {
        title: "In-Store Sales 30",
        width: 30,
        label: { show: false }
    };

    const color = {
        pattern: ['#f0f1f4', '#7a6fbe', '#28bbe3']
    };

    const size = {
        height: 300
    };

    return (
        <React.Fragment>
            <C3Chart data={data}  color={color} size={size} dir="ltr" />
        </React.Fragment>
    );
}

export default DonutChart;
