import React, { useState } from 'react'
//time related imports
import { DateRange } from 'react-date-range'
import { Select, InputLabel, MenuItem, FormControl, Button, TextField } from '@mui/material';
import format from 'date-fns/format'
import { addDays } from 'date-fns'


//chart related imports
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

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { getPolygonData } from '../controllers/polygonData'
const SearchOptions = () => {
  const [timeframe, setTimeframe] = useState('day');

  const [data, setData] = useState({
    ticker: 'Default',
    prices: [
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
      }
    ],
    color: ['green', 'red']
  })

  // date state
  const [range, setRange] = useState([
    {
      startDate: addDays(new Date(), - 14),
      endDate: addDays(new Date(), -7),
      key: 'selection'
    }
  ])

  const [tickerPrices, setTickerPrices] = useState('AAPL')

  const handleSubmit = (e) => {
    // setData({ ticker: tickerPrices, range: range })
    getPolygonData([range, tickerPrices, timeframe])
      .then((resp) => {
        console.log(resp)
        setData(resp)
      })
  }

  return (
    <div className='flex-grid'>
      <div className='col' style={{ width: '800px', height: '400px' }}>
        <Bar
          data={{
            datasets: [{
              label: data['ticker'],
              data: data['prices'],
              backgroundColor: data['color'],
              borderColor: data['color']
            }],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: false
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
      <div className='col'>
        <form onSubmit={handleSubmit} style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <TextField
            style={{ width: 175 }}
            onChange={(e) => setTickerPrices(e.target.value)}
            value={tickerPrices}
            label='Ticker'
            variant='outlined'
            color='secondary'
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Timeframe</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue='Daily'
              value={timeframe}
              label="Timeframe"
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <MenuItem value='day'>Daily</MenuItem>
              <MenuItem value='minute'>Minute</MenuItem>
              <MenuItem value='hour'>Hour</MenuItem>
              <MenuItem value='month'>Month</MenuItem>
              <MenuItem value='quarter'>Quarter</MenuItem>
              <MenuItem value='year'>Year</MenuItem>
            </Select>
          </FormControl>
          <input
            value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
            readOnly
            className="inputBox"
            onClick={() => setOpen(open => !open)}
          />
          <div>
            <DateRange
              onChange={item => setRange([item.selection])}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={1}
              maxDate={new Date()}
              direction="horizontal"
              className="calendarElement"
            />
          </div>


          <Button onClick={(e) => handleSubmit(e)}>Click me to submit</Button>
        </form>
      </div>


    </div >
  )
}

export default SearchOptions