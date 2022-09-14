import React, { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import { Button, TextField } from '@mui/material';
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import Bargraph from './Bargraph'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { getPolygonData } from '../controllers/polygonData'
const SearchOptions = () => {

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

  const [ticker, setTicker] = useState('AAPL')
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
    getPolygonData([range, ticker])
      .then((resp) => {
        setData(resp)
        console.log(data, 'data')
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
        <div>
          {/* maybe put textfield and the input for a flex box for STYLING */}
          <TextField
            style={{ width: 175 }}
            onChange={(e) => setTicker(e.target.value)}
            value={ticker}
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

      <Bargraph props={data} />
    </div>
  )
}

export default SearchOptions