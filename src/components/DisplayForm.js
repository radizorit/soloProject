import React, { useState, useRef } from 'react'
import { Grid, Button, Typography, Card, TextField } from '@mui/material';
import { postMessage, imageReader } from '../controllers/message';
import Webcam from 'react-webcam'
const DisplayForm = ({ messageData, setMessageData, done, setDone }) => {
    const [postData, setPostData] = useState({
        name: '',
        message: '',
        communication: '',
        image: ''
    })

    const [showWebcam, setShowWebcam] = useState(false)
    const webRef = useRef(null)

    const updateImage = () => {
        // setPostData({ ...postData, image: webRef.current.getScreenshot().slice(23) })
        setPostData({ ...postData, image: webRef.current.getScreenshot() })
        setShowWebcam(!showWebcam)

    }
    const webcamHide = () => {
        setShowWebcam(!showWebcam)
    }

    // const handleFileInputChange = (e) => {
    //     e.preventDefault();
    //     console.log('e.target.files[0]', e.target.files[0])
    //     let imageUrl = imageReader(e.target.files[0])
    //     console.log('imageUrl', imageUrl)
    //     // setPostData({ ...postData, image: imageUrl })
    // }

    const handleSubmit = (e) => {
        e.preventDefault(); //this prevents refreshing page
        // console.log('postData', postData)
        setMessageData([...messageData, postData])
        // console.log('messageData', messageData)
        // postMessage(postData)
        postMessage(postData)
        setDone(true)
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
                    <Grid fullwidth='true' container direction="row">
                        {/* <Button
                            sx={{ width: '50%' }}
                            variant='outlined'
                            label='Image'
                            color='secondary'
                            component='label'
                        >
                            Upload File
                            <input
                                type='file'
                                name='image'
                                hidden
                                onChange={handleFileInputChange}
                                className='form-input'
                            />
                        </Button> */}
                        <Button onClick={() => { webcamHide(); }}
                            sx={{ width: '50%' }}
                            variant='outlined'
                            color='secondary'>
                            Use webcam
                        </Button>
                    </Grid>
                    {showWebcam && (
                        <div>
                            <Webcam ref={webRef} />
                            <Button onClick={() => { updateImage(); }}>Capture webcam</Button>
                        </div>
                    )}
                    <Button onClick={(e) => handleSubmit(e)}>Click me to submit</Button>
                </ul>
            </form>
        </Card>
    );
}

export default DisplayForm