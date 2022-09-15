import React, { useState } from 'react'
import { Button, TextField, Typography, Card } from '@mui/material';
import { updateMessage, deleteMessage } from '../controllers/message'

export default function DisplayMessage({ messageData, setMessageData }) {
    const [messageProvided, setMessageProvided] = useState({
        messageid: '',
        name: '',
        message: '',
        communication: '',
        timeStamp: '',
        status: ''
    })

    const messageBeingUpdated = (e, fields) => {
        e.preventDefault(); //this prevents refreshing page
        setMessageData([...messageData, messageProvided])
        updateMessage(messageProvided, fields)
        postMessage(messageProvided)
    }
    return (
        <Card style={{ padding: "20px 40px 0px 0px", margin: "0 auto" }}>
            <Typography variant='h3'>Past Messages!</Typography>
            <div className='parentMessage'>
                {messageData.map((fields, i) => {
                    return (
                        <ul className='messageUl' key={i}>
                            <form style={{ margin: "0 auto" }}>
                                <Typography>Message #:{i + 1}</Typography>
                                <div className='justTextFields'>
                                    <TextField
                                        onChange={(e) => setMessageProvided({ ...messageProvided, id: e.target.value })}
                                        defaultValue={fields.messageid}
                                        label='id'
                                        variant='outlined'
                                        color='secondary'
                                    />
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
                                        onChange={(e) => setMessageProvided({ ...messageProvided, status: e.target.value })}
                                        defaultValue={fields.status}
                                        label='Status'
                                        variant='outlined'
                                        color='secondary'
                                    />
                                    <Button fullWidth onClick={(e) => messageBeingUpdated(e, fields)}>Update message</Button>
                                </div>
                            </form>
                            <div>
                                <Button onClick={() => deleteMessage(fields.messageid)}>Delete message</Button>

                            </div>
                        </ul>
                    )
                })}
            </div>
        </Card>
    )
}