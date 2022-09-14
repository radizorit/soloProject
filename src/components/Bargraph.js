import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Bargraph = ({ props }) => {
    console.log(props, 'props')
    // const [data, setData] = useState({
    //     ticker: '',
    //     data: [
    //         {

    //             x: '8/31/2022',
    //             o: 1.25,
    //             h: 1.35,
    //             l: 1.00,
    //             c: 1.10,
    //             s: [1.25, 1.1]
    //         },
    //         {
    //             x: '9/01/2022',
    //             o: 1.50,
    //             h: 1.60,
    //             l: 1.40,
    //             c: 1.35,
    //             s: [1.5, 1.35]
    //         }
    //     ],
    //     color: ['green', 'red']
    // })

    // useEffect(() => {
    //     getPolygonData()
    //         .then((resp) => {
    //             setData({
    //                 ticker: resp['ticker'],
    //                 data: resp['data'],
    //                 color: resp['color']
    //             })
    //         })
    //     // }, [data])
    // }, data)

    return (
        <div className="App" style={{ width: '800px', height: '400px' }}>
            <Bar
                data={{
                    // datasets: [{
                    //     label: props['ticker'],
                    //     data: props['prices'],
                    //     backgroundColor: props['color'],
                    //     borderColor: props['color']
                    // }],
                    datasets: [{
                        label: 'AAPL',
                        data: [
                            {

                                x: '8/31/2022',
                                o: 1.25,
                                h: 1.35,
                                l: 1.00,
                                c: 1.10,
                                s: [1.25, 1.1]
                            },
                            {
                                x: '9/01/2022',
                                o: 1.50,
                                h: 1.60,
                                l: 1.40,
                                c: 1.35,
                                s: [1.5, 1.35]
                            },
                            {
                                x: '9/02/2022',
                                o: 1.50,
                                h: 1.60,
                                l: 1.40,
                                c: 1.35,
                                s: [1.5, 1.35]
                            }
                        ],
                        backgroundColor: ['red', 'green'],
                        borderColor: ['red', 'green']
                    }],
                }}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    parsing: {
                        xAxisKey: 'x',
                        yAxisKey: 's'
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Bar Chart',
                        },
                    }
                }}
            />
        </div>
    )
};
export default Bargraph;