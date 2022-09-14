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
        })
    } catch (e) {
        console.log(e, 'unsuccessful')
    }
}


export async function getMessage() {
    try {
        // console.log('hello messageData', messageData)
        // console.log('sending...')
        return await axios.get('http://localhost:5000/api/1/communications/message/get')
            .then((resp) => {
                console.log('resp', resp.data)
                return resp.data
            })
    } catch (e) {
        console.log(e, 'unsuccessful')
    }
}


export async function deleteMessage(messageid) {
    try {
        axios.delete(`http://localhost:5000/api/1/communications/message/delete/${messageid}`)
    } catch (e) {
        console.error(e, 'troubles deleting in display message')
    }
}

export async function updateMessage(messageProvided, fields) {
    try {
        let id = fields.messageid
        await axios({
            method: 'put',
            url: `http://localhost:5000/api/1/communications/message/update/${id}`,
            data: {
                messageid: messageProvided.messageid,
                name: messageProvided.name || fields.name,
                message: messageProvided.message || fields.message,
                communication: messageProvided.communication || fields.communication,
                status: messageProvided.status || fields.status,
                timeStamp: fields.timeStamp,
            }
        })
    } catch (e) {
        console.error(e, 'troubles updating in display message')
    }
}
