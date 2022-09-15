import React, { useState } from 'react'
import { Button, TextField, Typography, Card } from '@mui/material';
import { updateMessage, deleteMessage } from '../controllers/message'

export default function DisplayMessage({ props }) {
    const [messageProvided, setMessageProvided] = useState({
        messageid: '',
        name: '',
        message: '',
        communication: '',
        timeStamp: '',
        status: ''
    })

    return (
        <Card style={{ padding: "20px 40px 0px 0px", margin: "0 auto" }}>
            <Typography variant='h3'>Past Messages!</Typography>
            {props.map((fields, i) => {
                return (
                    <div className='pastMessages'>
                        <ul key={i}>
                            <form style={{ padding: "20px 5px", margin: "0 auto" }}>
                                <Typography>Message #:{i + 1}</Typography>
                                <TextField
                                    onChange={(e) => setMessageProvided({ ...messageProvided, id: e.target.value })}
                                    defaultValue={fields.messageid}
                                    label='id'
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                />
                                <TextField
                                    onChange={(e) => setMessageProvided({ ...messageProvided, name: e.target.value })}
                                    defaultValue={fields.name}
                                    label='Name'
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                />
                                <TextField
                                    onChange={(e) => setMessageProvided({ ...messageProvided, message: e.target.value })}
                                    defaultValue={fields.message}
                                    label='Message'
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                />
                                <TextField
                                    onChange={(e) => setMessageProvided({ ...messageProvided, communication: e.target.value })}
                                    defaultValue={fields.communication}
                                    label='Communication'
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                />
                                <TextField
                                    onChange={(e) => setMessageProvided({ ...messageProvided, status: e.target.value })}
                                    defaultValue={fields.status}
                                    label='Status'
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                />
                            </form>
                            <Button onClick={() => deleteMessage(fields.messageid)}>Delete message</Button>
                            <Button onClick={() => updateMessage(messageProvided, fields)}>Update message</Button>
                        </ul>
                    </div>
                )
            })}
        </Card>
    )
}