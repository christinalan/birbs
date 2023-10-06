import { useState } from 'react'
import RegionSelection from './regionSelection.js'
import BirdData from './gettingBirdData.js';

function LoggedInInfo() {
    const [selectedRegion, setSelectedRegion] = useState(null);

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
    }

    return (
        <div>
            <RegionSelection onSelect={handleRegionChange}/>
            {selectedRegion && <BirdData selectedRegion={selectedRegion}/>}
        </div>
    )   
}

export default LoggedInInfo;