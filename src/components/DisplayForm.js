import React, { useState, useRef } from 'react'
import { Grid, Button, Typography, Card, TextField } from '@mui/material';
import { postMessage } from '../controllers/message';
const DisplayForm = () => {
    const [messageData, setMessageData] = useState({
        name: '',
        message: '',
        communication: '',
    })


    const handleSubmit = (e) => {
        e.preventDefault(); //this prevents refreshing page
        postMessage(messageData)
    }

    return (
        <Card style={{ maxWidth: 450, padding: "20px 40px 0px 0px", margin: "0 auto" }}>
            <Typography variant='h4'>Record your trading thoughts</Typography>
            <form onSubmit={handleSubmit} style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                <ul>
                    <TextField
                        onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
                        label='Name'
                        variant='outlined'
                        color='secondary'
                        fullWidth
                    />
                    <TextField
                        onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                        label='Message'
                        variant='outlined'
                        color='secondary'
                        fullWidth
                    />
                    <TextField
                        onChange={(e) => setMessageData({ ...messageData, communication: e.target.value })}
                        label='Communication'
                        variant='outlined'
                        color='secondary'
                        fullWidth
                    />
                    <Button onClick={(e) => handleSubmit(e)}>Click me to submit</Button>
                </ul>
            </form>
        </Card>
    );
}

export default DisplayForm