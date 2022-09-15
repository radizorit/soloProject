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

import { getPolygonData } from '../controllers/polygonData'

const Bargraph = ({ props }) => {
    const [chartData, setChartData] = useState(props)
    return (
        <div className="App" style={{ width: '800px', height: '400px' }}>
            <Bar
                data={{
                    datasets: [{
                        label: chartData['ticker'],
                        data: chartData['prices'],
                        backgroundColor: chartData['color'],
                        borderColor: chartData['color']
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