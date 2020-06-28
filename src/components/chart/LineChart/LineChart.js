import React from 'react'
import { Chart } from 'react-charts'


const LineChart = () => {

    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
                label: 'Series 2',
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            }
        ],
        []
    )

    // const series = React.useMemo(
    //     () => ({
    //         showPoints: false
    //     }),
    //     []
    // )
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'time', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )
    return (

        <Chart data={data} axes={axes} tooltip />

    )
}

export default LineChart;