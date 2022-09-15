import React, { useState, useEffect } from 'react'

import DisplayForm from '../components/DisplayForm'
import DisplayMessages from '../components/DisplayMessages'
import SearchOptions from '../components/SearchOptions'
import { getMessage } from '../controllers/message';

const Chart = () => {
    const [messageData, setMessageData] = useState([])

    useEffect(() => {
        getMessage()
            .then((response) => {
                setMessageData(response)
            })
    }, [])

    return (
        <div>
            <SearchOptions />
            <DisplayForm />
            <DisplayMessages props={messageData} />
        </div>

    )
}

export default Chart