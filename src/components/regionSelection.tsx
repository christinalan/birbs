import { useState, useEffect, ChangeEvent, FC } from 'react';
import USregionData from '../data/USregions.json';
import CAregionData from '../data/CAregions.json'

interface RegionSelectionProps {
    onSelect: (selectedRegion: Region | null) => void;
}

interface Region {
    abbreviation: string,
    name: string;
}


const RegionSelection: FC<RegionSelectionProps> = ({onSelect}) => {
    const [country, setCountry] = useState("");
    const [regions, setRegions] = useState<Region[]>([]);
    const [regionNames, setRegionNames] = useState<HTMLOptionElement[]>();
    //setting US regions
    const usRegions: Region[] = USregionData.data;
    const caRegions: Region[] = CAregionData.data;
    
    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const selectedCountry = event.target.value;
        setCountry(selectedCountry);
    }
    
    useEffect(() => {
        if (country === "US") {
            setRegions(usRegions)
            
        } else if (country === "CA") {
            setRegions(caRegions);
        }
    }, [country])
    
    

    
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const selectedOption = event.target.value;
        const selectedRegion = usRegions.find((region: Region) => region.name === selectedOption)
        onSelect(selectedRegion || null)
    }

    return (
        <div className="region-dropdown">
            <select name="countries" value={country} onChange={handleCountryChange}>
                <option value="none">Please select a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
            </select>
                <select name="regions" onChange={handleSelectChange}>
                    <option value="none">Please select a region</option>
                    {regions.map((region: Region) => (
                        <option key={region.abbreviation} value={region.name}>{region.name}</option>
                    ))}
                </select>
        </div>
    )
}


export default RegionSelection;