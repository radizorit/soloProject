const dotenv = require('dotenv')
const express = require('express');
const app = express();
const MessageRoute = require('./routes/message')
const cors = require('cors')

const mongo = require('./adapters/mongoConnection')
const https = require('https')

dotenv.config()
app.use(cors())
app.use('/', MessageRoute)

const bodyParser = require('body-parser');

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

let port = 5000

mongo.connect()
    .then(() => {
        console.log('DB Connection Successful')
    })
    .then(() => {
        //Server
        app.listen(port, () => {
            console.log(`SERVER RUNS ON ${port}`)
        })
    })
    .catch((e) => {
        console.error(e)
    })

app.get('/express_backend', (req, res) => {
    res.send({ express: 'UPDATED' });
});