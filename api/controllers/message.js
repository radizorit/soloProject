const db = require('../models/message');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const from = process.env.TWILIO_FROM;
// const client = require('twilio')(accountSid, authToken);
/**
 *
 * DROP TABLE MESSAGES 
    CREATE TABLE Messages(
    MessageID int,
    name varchar(255),
    message varchar(255),
    communication varchar(255),
    timestamp Date,
    status varchar(255),
    image varchar(5000)
    );
 */
module.exports.updateMessage = async (req, res) => {
    let updateMessageQuery = `UPDATE MESSAGES
    SET messageid = ${req.params.id}, name= '${req.body.name}', message = '${req.body.message}', communication = '${req.body.communication}', status = 'update'
    WHERE MessageID = ${req.params.id};`
    return db
        .query(updateMessageQuery)
        .then((resp) => {
            console.log('resp of updateMessage', resp)
        })
        .catch((err) => {
            console.error(err)
        })
}

module.exports.deleteMessage = async (req, res) => {
    let deleteMessageQuery = `DELETE FROM MESSAGES WHERE MESSAGEID = ${req.params.id}`
    return db
        .query(deleteMessageQuery)
        .then((resp) => {
            console.log('resp of deleteMessage', resp)
        })
        .catch((err) => {
            console.error(err)
        })
}


module.exports.getMessages = async (req, res) => {
    // console.log('req.body', req.body)
    // let message = req.body, twilioMsg, postMessage, cloudVisionResults, twilioMessageInput
    let getMessagesQuery = 'SELECT * FROM messages'
    return db
        .query(getMessagesQuery)
        .then(resp => {
            res.json(resp['rows'])
            // return next()
        })
        .catch(err => {
            next({
                log: 'error in middleware getSpecies',
                msg: { err: 'check middleware getSpecies' }
            })
        })
}

module.exports.createMessage = async (req, res) => {
    // await client.messages
    //     .create({
    //         body: req.body.message,
    //         from: from,
    //         to: '+16267823475'
    //     })
    //     .then((message) => console.log(message))
    let randomId = Math.floor(Math.random() * 100)
    let addMessageQuery =
        `INSERT INTO MESSAGES VALUES(${randomId}, '${req.body.name}', '${req.body.message}', '${req.body.communication}', '${req.body.timeStamp}', '${req.body.status}', '${req.body.image}')`
    return db
        .query(addMessageQuery)
        .then(resp => {
            console.log('successfully posted to the db!~')
        })
        .catch(err => {
            console.error(err, 'error creating message in backend controller')
        })
}