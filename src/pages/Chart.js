import React, { useState, useEffect } from 'react'

import Bargraph from '../components/Bar'
import DisplayForm from '../components/DisplayForm'
import DisplayMessages from '../components/DisplayMessages'
import { getMessage } from '../controllers/message';

const Chart = () => {
    const [messageData, setMessageData] = useState([])

    useEffect(() => {
        getMessage()
            .then((response) => {
                setMessageData(response)
            })
        // }, [messageData]);
    }, messageData);

    return (
        <div>
            <Bargraph />
            <DisplayForm />
            <DisplayMessages props={messageData} />
        </div>
    )
}

export default Chart