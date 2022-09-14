const db = require('../models/message');



module.exports.updateMessage = async (req, res) => {
    try {
        console.log('req.body', req.body)
        console.log('req.params', req.params)
        console.log('req.query', req.query)

        console.log('update completed from controllers')
    } catch (e) {
        console.error(e, 'controllers error updating')
    }
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
    let addMessageQuery =
        `INSERT INTO MESSAGES VALUES(5, '${req.body.name}', '${req.body.message}', '${req.body.communication}', '${req.body.timeStamp}', '${req.body.status}')`
    return db
        .query(addMessageQuery)
        .then(resp => {
            console.log('successfully posted to the db!~')
        })
        .catch(err => {
            console.error(err, 'error creating message in backend controller')
        })
}