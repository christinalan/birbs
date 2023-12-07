import { useState, useEffect, ChangeEvent, FC } from 'react';
import USregionData from '../data/USregions.json';
import CAregionData from '../data/CAregions.json';
import countryData from '../data/countries.json';

interface RegionSelectionProps {
    onSelect: (selectedRegion: RegionObject | null) => void;
}

interface Region {
    abbreviation: string;
    name: string;
}

interface RegionObject {
    country: string | any;
    abbreviation: string | any;
    name: string | any;
}

const RegionSelection: FC<RegionSelectionProps> = ({onSelect}) => {
    const [countries, setCountries] = useState<Region[]>(countryData.data);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [regions, setRegions] = useState<Region[] | null>([]);
    const [selectedRegion, setSelectedRegion] = useState<string | any>("");
    const [selectedLocation, setSelectedLocation] = useState<RegionObject | null>(null)

    //setting US regions
    const usRegions: Region[] = USregionData.data;
    const caRegions: Region[] = CAregionData.data;
    // const allCountries: Region[] = countryData.data;
    
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
        } else {
            setRegions(null);
        }
    }, [selectedCountry, caRegions, usRegions])
    
    
    //handles the region selection (happens after country is set)
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const selectedOption = event.target.value;
        setSelectedRegion(selectedOption);

    }
        
    useEffect(() => {
        const fetchData = async () => {
            if (regions !== null) {
                //matching the selected Region with the regions data
                const currentSelectedRegion = regions.find((region: Region) => region.name === selectedRegion)
                //setting function form of state, state is updated based on the latest state.
                setSelectedLocation((prevLocation) => ({
                    ...prevLocation,
                    country: selectedCountry,
                    abbreviation: currentSelectedRegion?.abbreviation,
                    name: currentSelectedRegion?.name
                }))
            } else {
                const currentSelectedCountry = countries.find((country: Region) => country.abbreviation === selectedCountry)
   
                setSelectedLocation((prevLocation) => ({
                    ...prevLocation,
                    country: selectedCountry,
                    abbreviation: currentSelectedCountry?.name, // confusing but switching this to reflect the actual name of the country if there's only country
                    name: ''
                }))
                
            }
            
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
        <div className="region-dropdown text-center flex flex-col sm:flex-row sm:justify-start items-center sm:items-start gap-2 ">
            <select className="bg-sky-100 text-lg h-10 px-5 py-0 w-60 rounded-md shadow-sm " name="countries" value={selectedCountry} onChange={handleCountryChange}>
                <option value="none">Please select a country</option>
                {countries.map((country) => (
                    <option key={country.abbreviation} value={country.abbreviation}>{country.name}</option>
                ))}
            </select>
                {regions && <select className="bg-sky-100 h-10 text-lg px-5 py-0 w-60 rounded-md shadow-sm " name="regions" onChange={handleSelectChange}>
                    <option value="none">Please select a region</option>
                    {regions.map((region: Region) => (
                        <option key={region.abbreviation} value={region.name}>{region.name}</option>
                    ))}
                </select>}
               
        </div>
    )
}


export default RegionSelection;