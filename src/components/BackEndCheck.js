import React, { useEffect, useState } from 'react'

const BackEndCheck = () => {
    const [data, setData] = useState('NOT UPDATED')

    useEffect(() => {
        async function callBackendAPI() {
            const response = await fetch('http://localhost:5000/express_backend');
            const body = await response.json()
            if (response.status !== 200) {
                throw Error(body.message)
            }
            setData(body['express'])
        };

        callBackendAPI()
            .catch(console.error)
    })
    return (
        <>
            <div>{data}</div>
        </>
    )
}

export default BackEndCheck