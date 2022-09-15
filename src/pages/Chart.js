import React, { useState, useEffect } from 'react'

import DisplayForm from '../components/DisplayForm'
import DisplayMessages from '../components/DisplayMessages'
import SearchOptions from '../components/SearchOptions'
import { getMessage } from '../controllers/message';

const Chart = () => {
    const [messageData, setMessageData] = useState([])
    const [done, setDone] = useState(false)

    useEffect(() => {
        getMessage()
            .then((response) => {
                setMessageData(response)
            })
    }, [])

    return (
        <div>
            <SearchOptions />
            <DisplayForm messageData={messageData} setMessageData={setMessageData} done={done} setDone={setDone} />
            <DisplayMessages messageData={messageData} setMessageData={setMessageData} done={done} setDone={setDone} />
        </div>

    )
}

export default Chart