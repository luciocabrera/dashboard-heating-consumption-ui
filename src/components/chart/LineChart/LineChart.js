import React from 'react'
import { Chart } from 'react-charts'


const data = [
    {
        x: '2020-02-10',
        y: 23
    },
];

const LineChart = () => {

    const series = React.useMemo(
        () => ({
            showPoints: false
        }),
        []
    )
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'time', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )
    return (

        <Chart data={data} series={series} axes={axes} tooltip />

    )
}

export default LineChart;