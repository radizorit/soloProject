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

import { getPolygonData } from '../controllers/polygonData'
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Bargraph = () => {
    const [data, setData] = useState({
        tickerName: 'TICKER',
        label: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
        close: [10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
        colors: ['red', 'blue', 'yellow', 'green']
    })
    // const [tickerName, setTickerName] = useState('TICKER')
    // const [label, setLabels] = useState(["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"])
    // const [datasets, setDatasets] = useState([10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58])

    useEffect(() => {
        getPolygonData()
            .then((resp) => {
                setData({
                    tickerName: resp['label'],
                    label: resp['timeLabel'],
                    close: resp['close']
                })
                // setDatasets(resp['close']);
                // setLabels(resp['timeLabel']);
                // setTickerName(resp['label'])
            })
    }, data)
    // getPolygonData()

    return (
        <div className="App" style={{ width: '800px', height: '800px' }}>
            <Bar
                data={{
                    // labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
                    labels: data['label'],
                    // datasets: [this.state.datasets],
                    datasets: [
                        {
                            label: data['tickerName'],
                            data: data['close'],
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.4)',
                        }
                    ],
                }}
                options={{
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