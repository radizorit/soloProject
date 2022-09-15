import React, { useState, useRef } from 'react'
import { Grid, Button, Typography, Card, TextField } from '@mui/material';
import { postMessage } from '../controllers/message';
const DisplayForm = ({ messageData, setMessageData }) => {
    const [postData, setPostData] = useState({
        name: '',
        message: '',
        communication: '',
    })


    const handleSubmit = (e) => {
        e.preventDefault(); //this prevents refreshing page
        console.log('postData', postData)
        setMessageData([...messageData, postData])
        console.log('messageData', messageData)
        postMessage(postData)
    }

    return (
        <Card style={{ maxWidth: 450, padding: "20px 40px 0px 0px", margin: "0 auto" }}>
            <Typography variant='h4'>Record your trading thoughts</Typography>
            <form onSubmit={handleSubmit} style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                <ul>
                    <TextField
                        onChange={(e) => setPostData({ ...postData, name: e.target.value })}
                        label='Name'
                        variant='outlined'
                        color='secondary'
                        fullWidth
                    />
                    <TextField
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                        label='Message'
                        variant='outlined'
                        color='secondary'
                        fullWidth
                    />
                    <TextField
                        onChange={(e) => setPostData({ ...postData, communication: e.target.value })}
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