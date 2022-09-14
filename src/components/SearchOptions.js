import React, { useState } from 'react';
import dayjs from 'dayjs';

import { Stack, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


export default function SearchOptions() {
  const [ticker, setTicker] = useState('APPL');

  const [start, setStart] = useState(
    dayjs('2022-08-18T21:11:54')
  );

  const [end, setEnd] = useState(
    dayjs('2022-09-14T21:11:54')
  );

  return (
    // fix the date, it keeps going to most recent date
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TextField
          onChange={(e) => setTicker()}
          value={ticker}
          label='Ticker'
          variant='outlined'
          color='secondary'
          fullWidth
        />
        <DesktopDatePicker
          label="Start Date"
          inputFormat="YYYY-MM-DD"
          value={start}
          onChange={(e) => setStart()}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="End Date"
          inputFormat="YYYY-MM-DD"
          value={end}
          onChange={(e) => setEnd()}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}


/**
 import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
 */