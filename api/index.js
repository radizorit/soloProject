const dotenv = require('dotenv')
const express = require('express');
const app = express();

const cors = require('cors')
const MessageRoute = require('./routes/message')
const https = require('https')

dotenv.config()
app.use(cors())


const bodyParser = require('body-parser');

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', MessageRoute)

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
let port = 5000
//Server
app.listen(port, () => {
    console.log(`SERVER RUNS ON ${port}`)
})

app.get('/express_backend', (req, res) => {
    res.send({ express: 'UPDATED' });
});