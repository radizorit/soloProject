import axios from 'axios'
import moment from 'moment-timezone';

export function postMessage(messageData) {
    try {
        // console.log('hello messageData', messageData)
        console.log('sending...', messageData)
        axios.post('http://localhost:5000/api/1/communications/message/create', {
            name: messageData['name'],
            message: messageData['message'],
            communication: messageData['communication'],
            timeStamp: moment().tz('America/Los_Angeles').format(),
            status: 'queue',
            // image: messageData['image']
        })
    } catch (e) {
        console.log(e, 'unsuccessful')
    }
}