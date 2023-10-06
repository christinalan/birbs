import { useState, useEffect } from 'react'
import  ShowBirdData  from './showBirdData'
import FirestoneData from '../data/firestoneData';

let myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", "fvuoeq8d9dt2");

let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
}

function BirdData({selectedRegion}) {

    const [data, setData] = useState([]);
    const [limitedData, setLimitedData] = useState([]);


    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.ebird.org/v2/data/obs/US-${selectedRegion.abbreviation}/recent`, requestOptions)
            const newData = await response.json();
              // const cappedData = newData.slice(0, 50);
            //ensuring data is in the data array before setting the data
            if (Array.isArray(newData)) {
                setData(newData);
                //slice it to just return 50 results
                setLimitedData(newData.slice(0, 50));
            }
        
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (selectedRegion) {

            fetchData();
        }
    }, [selectedRegion])


   return (
    <div>
        {limitedData ? (
            <div>
                  <h2>Birds spotted recently in {selectedRegion.name}</h2>
                  <ShowBirdData birdData={limitedData}/>
                  <FirestoneData birdData={limitedData}/>
            </div>
        ): (<p>Loading...</p>)
        }

    </div>
   );

}

export default BirdData;