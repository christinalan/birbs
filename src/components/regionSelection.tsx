import { useState, useEffect, ChangeEvent, FC } from 'react';
import USregionData from '../data/USregions.json';
import CAregionData from '../data/CAregions.json'

interface RegionSelectionProps {
    onSelect: (selectedRegion: RegionObject | null) => void;
}

interface Region {
    abbreviation: string;
    name: string;
}

interface RegionObject {
    country: string;
    abbreviation: string | any;
    name: string | any;
}

const RegionSelection: FC<RegionSelectionProps> = ({onSelect}) => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [regions, setRegions] = useState<Region[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<string | any>("");
    const [selectedLocation, setSelectedLocation] = useState<RegionObject | null>(null)

    //setting US regions
    const usRegions: Region[] = USregionData.data;
    const caRegions: Region[] = CAregionData.data;
    
    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry);
    }
    
    //will set the regions that will populate the region selection element
    useEffect(() => {
        if (selectedCountry === "US") {
            setRegions(usRegions)
            
        } else if (selectedCountry === "CA") {
            setRegions(caRegions);
        }
    }, [selectedCountry])
    
    
    //handles the region selection (happens after country is set)
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const selectedOption = event.target.value;
        setSelectedRegion(selectedOption);

    }
        
    useEffect(() => {
        const fetchData = async () => {
            const currentSelectedRegion = regions.find((region: Region) => region.name === selectedRegion)
            
            //setting function form of state, state is updated based on the latest state.
            setSelectedLocation((prevLocation) => ({
                ...prevLocation,
                country: selectedCountry,
                abbreviation: currentSelectedRegion?.abbreviation,
                name: currentSelectedRegion?.name
            }))
        }
        fetchData()
       
    }, [selectedRegion, regions, selectedCountry])
    

    useEffect(() => {
        //this was the only conditional that worked to stop all onSelects until the location was set
        if (selectedLocation?.abbreviation !== undefined) {
            onSelect(selectedLocation || null)
        }
        
    }, [selectedLocation])

    return (
        <div className="region-dropdown">
            <select name="countries" value={selectedCountry} onChange={handleCountryChange}>
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