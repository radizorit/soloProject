const Message = require('../models/message');

module.exports.createMessage = async (req, res) => {
    // console.log('req.body', req.body)
    // let message = req.body, twilioMsg, postMessage, cloudVisionResults, twilioMessageInput
    try {
        postMessage = new Message()
        await postMessage.createMessage({
            id: message._id,
            name: 'woooow',
            message: 'woooow',
            communication: 'woooow',
            timeStamp: 'woooow'
        })
    } catch (e) {
        console.error('error for creating message', e)
    }
}