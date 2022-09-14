import React, { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import { Button, TextField } from '@mui/material';
import format from 'date-fns/format'
import { addDays } from 'date-fns'
// import Bargraph from './Bargraph'
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

  const [data, setData] = useState({
    ticker: 'Default',
    // range: {}
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
  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  const handleSubmit = (e) => {
    // setData({ ticker: tickerPrices, range: range })
    getPolygonData([range, tickerPrices])
      .then((resp) => {
        console.log(resp)
        setData(resp)
        // console.log(data, 'data')
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
        <div>
          {/* maybe put textfield and the input for a flex box for STYLING */}
          <TextField
            style={{ width: 175 }}
            onChange={(e) => setTickerPrices(e.target.value)}
            value={tickerPrices}
            label='Ticker'
            variant='outlined'
            color='secondary'
          />
          <input
            value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
            readOnly
            className="inputBox"
            onClick={() => setOpen(open => !open)}
          />
          <div ref={refOne}>
            <DateRange
              onChange={item => setRange([item.selection])}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={1}
              direction="horizontal"
              className="calendarElement"
            />
          </div>

        </div>
        <Button onClick={(e) => handleSubmit(e)}>Click me to submit</Button>
      </form>

      {/* <Bargraph props={data} /> */}
      <div className="App" style={{ width: '800px', height: '400px' }}>
        <Bar
          data={{
            datasets: [{
              label: data['ticker'],
              data: data['prices'],
              backgroundColor: data['color'],
              borderColor: data['color']
            }],
            // datasets: [{
            //     label: 'AAPL',
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
            //         },
            //         {
            //             x: '9/02/2022',
            //             o: 1.50,
            //             h: 1.60,
            //             l: 1.40,
            //             c: 1.35,
            //             s: [1.5, 1.35]
            //         }
            //     ],
            //     backgroundColor: ['red', 'green'],
            //     borderColor: ['red', 'green']
            // }],
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
    </div>
  )
}

export default SearchOptions