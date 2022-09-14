import React, { useState, useEffect } from 'react'

import Bargraph from '../components/Bar'
import DisplayForm from '../components/DisplayForm'
import DisplayMessages from '../components/DisplayMessages'
// import SearchOptions from '../components/SearchOptions'
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
            {/**
             * <SearchOptions />
             * have SearchOptions be the parent of bargraph
             * have the state of SearchOptions be the props for Bargraph (data from polygonData api)
             * MAKE SURE SEARCHOPTIONS HAS PRESET CRITERIAS LOL
            */}
            <Bargraph />
            <DisplayForm />
            <DisplayMessages props={messageData} />
        </div>
    )
}

export default Chart