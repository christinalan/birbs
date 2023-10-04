import { useState, useEffect } from 'react'

function BirdData() {
    let myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", "fvuoeq8d9dt2");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }

    const [data, setData] = useState(null)
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://api.ebird.org/v2/data/obs/US-NY/recent', requestOptions)
            setData(await response.json());
        }
        fetchData()
        .catch(error => {
            console.error('There was an error with the fetch request', error);
        })

    }, [])

   return data;

}

export default BirdData;