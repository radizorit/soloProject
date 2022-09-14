import React, { useState, useEffect } from 'react'

import DisplayForm from '../components/DisplayForm'
import DisplayMessages from '../components/DisplayMessages'
import SearchOptions from '../components/SearchOptions'
import { getMessage } from '../controllers/message';

const Chart = () => {
    const [messageData, setMessageData] = useState([])

    getMessage()
        .then((response) => {
            setMessageData(response)
        })

    return (
        <div>
            {/**
             * <SearchOptions />
             * have SearchOptions be the parent of bargraph
             * have the state of SearchOptions be the props for Bargraph (data from polygonData api)
             * MAKE SURE SEARCHOPTIONS HAS PRESET CRITERIAS LOL
            */}
            <SearchOptions />
            <DisplayForm />
            <DisplayMessages props={messageData} />
        </div>
    )
}

export default Chart