import axios from 'axios'
import moment from 'moment-timezone';

export function postMessage(messageData) {

    try {
        axios.post('http://localhost:5000/api/1/communications/message/create', {
            messageid: messageData['messageid'],
            name: messageData['name'],
            message: messageData['message'],
            communication: messageData['communication'],
            image: messageData['image'],
            timestamp: moment().tz('America/Los_Angeles').format(),
            status: 'queue',
        })
    } catch (e) {
        console.log(e, 'unsuccessful')
    }
}

export function imageReader(image) {
    try {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            return reader.result
        }
    } catch (e) {
        console.error(e, 'imageReader')
    }
}

export async function getMessage() {
    try {
        // console.log('hello messageData', messageData)
        // console.log('sending...')
        return await axios.get('http://localhost:5000/api/1/communications/message/get')
            .then((resp) => {
                return resp.data
            })
    } catch (e) {
        console.log(e, 'unsuccessful')
    }
}

export async function deleteMessage(messageid) {
    try {
        console.log(messageid, 'messageid from deletion controller')
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
