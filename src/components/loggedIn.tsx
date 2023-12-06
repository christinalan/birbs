import { useState } from 'react'
import RegionSelection from './regionSelection.tsx'
import BirdData from './gettingBirdData.js';


interface Location {
    country: string,
    abbreviation: string,
    name: string;
}

function LoggedInInfo() {
    const [selectedRegion, setSelectedRegion] = useState<Location | null>(null);

    //selectedRegion handles both regions for US or Canada as well as regions for all other countries (the country itself is the region);
    const handleRegionChange = (selectedRegion: Location | null) => {
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