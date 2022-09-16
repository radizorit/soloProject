import React, { useState } from 'react'
import { Box, Button, TextField, Typography, Card } from '@mui/material';
import { updateMessage, deleteMessage } from '../controllers/message'

export default function DisplayMessage({ messageData, setMessageData, done, setDone }) {
    const [messageProvided, setMessageProvided] = useState({
        messageid: '',
        name: '',
        message: '',
        communication: '',
        timestamp: '',
        status: ''
    })
    const messageBeingUpdated = (e, fields) => {
        e.preventDefault(); //this prevents refreshing page
        setMessageData([...messageData, messageProvided])
        updateMessage(messageProvided, fields)
        postMessage(messageProvided)
    }
    const openMoreMessages = (e) => {
        e.preventDefault()
        setDone(true)
    }

    const updateDeletedState = (id) => {
        deleteMessage(id)
        let copiedMessageData = messageData
        let filteredMessage = copiedMessageData.filter(allId => allId['messageid'] != id)
        setMessageData(filteredMessage)
    }
    return (
        <Card style={{ padding: "20px 40px 0px 0px", margin: "0 auto" }}>
            <Typography variant='h3'>Past Messages!</Typography>
            <button onClick={(e) => openMoreMessages(e)}>See more messages</button>
            <div className='parentMessage'>
                {done && messageData.map((fields, i) => {
                    return (
                        <ul className='messageUl' key={i}>
                            <form style={{ margin: "0 auto" }}>
                                <Typography>Message #:{i + 1}</Typography>
                                <div className='justTextFields'>
                                    <TextField
                                        onChange={(e) => setMessageProvided({ ...messageProvided, name: e.target.value })}
                                        defaultValue={fields.name}
                                        label='Name'
                                        variant='outlined'
                                        color='secondary'
                                    />
                                    <TextField
                                        onChange={(e) => setMessageProvided({ ...messageProvided, message: e.target.value })}
                                        defaultValue={fields.message}
                                        label='Message'
                                        variant='outlined'
                                        color='secondary'
                                    />
                                    <TextField
                                        onChange={(e) => setMessageProvided({ ...messageProvided, communication: e.target.value })}
                                        defaultValue={fields.communication}
                                        label='Communication'
                                        variant='outlined'
                                        color='secondary'
                                    />
                                    <TextField
                                        onChange={(e) => setMessageProvided({ ...messageProvided, timestamp: e.target.value })}
                                        defaultValue={fields.timestamp}
                                        label='Timestamp'
                                        variant='outlined'
                                        color='secondary'
                                    />
                                    <Box
                                        component='img'
                                        alt='img'
                                        style={{ maxWidth: '500px' }}
                                        src={fields.image}
                                    />
                                    <div>
                                        <Button fullWidth style={{ maxHeight: '100px' }} onClick={(e) => messageBeingUpdated(e, fields)}>Update message</Button>
                                        <Button fullWidth style={{ maxHeight: '100px' }} onClick={() => updateDeletedState(fields.messageid)}>Delete message</Button>
                                    </div>
                                </div>
                            </form>
                        </ul>
                    )
                })}
                {/* abc */}
            </div>
        </Card>
    )
}