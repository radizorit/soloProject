// import React, { useState, useRef } from 'react'
// import { Grid, Button, Typography, Card, TextField } from '@mui/material';
// import { getPolygonData } from '../controllers/polygonData'

// const SearchOptions = () => {
//     const [searchCriteria, setSearchCriteria] = useState({
//         ticker: 'AAPL',
//         start: '2021-08-01',
//         end: new Date().getMonth() + '/' + new Date().getDate() + '/' + new Date().getFullYear(),
//         timeframe: 'day'
//     })


//     const handleSubmit = (e) => {
//         e.preventDefault(); //this prevents refreshing page
//         getPolygonData(searchCriteria)
//     }

//     return (
//         <Card style={{ maxWidth: 450, padding: "20px 40px 0px 0px" }}>
//             <Typography variant='h3'>Send a message!</Typography>
//             <form onSubmit={handleSubmit} style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
//                 <ul>
//                     <TextField
//                         onChange={(e) => setSearchCriteria({ ...searchCriteria, ticker: e.target.value })}
//                         label='Ticker'
//                         // variant='outlined'
//                         // color='secondary'
//                         fullWidth
//                     />
//                     <TextField
//                         onChange={(e) => setSearchCriteria({ ...searchCriteria, start: e.target.value })}
//                         label='Start'
//                         variant='outlined'
//                         color='secondary'
//                         fullWidth
//                     />
//                     <TextField
//                         onChange={(e) => setSearchCriteria({ ...searchCriteria, end: e.target.value })}
//                         label='End'
//                         variant='outlined'
//                         color='secondary'
//                         fullWidth
//                     />
//                     <TextField
//                         onChange={(e) => setSearchCriteria({ ...searchCriteria, timeframe: e.target.value })}
//                         label='Range'
//                         variant='outlined'
//                         color='secondary'
//                         fullWidth
//                     />
//                     <Button onClick={(e) => handleSubmit(e)}>Click me to submit</Button>
//                 </ul>
//             </form>
//         </Card>
//     );
// }

// export default SearchOptions