import { useState } from 'react'
import RegionSelection from './regionSelection.tsx'
import BirdData from './gettingBirdData.js';

interface Region {
    abbreviation: string,
    name: string;
}

function LoggedInInfo() {
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

    const handleRegionChange = (selectedRegion: Region | null) => {
        setSelectedRegion(selectedRegion);
    }

    return (
        <div>
            <RegionSelection onSelect={handleRegionChange}/>
            {selectedRegion && <BirdData selectedRegion={selectedRegion}/>}
        </div>
    )   
}

export default LoggedInInfo;