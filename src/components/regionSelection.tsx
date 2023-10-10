import { ChangeEvent, FC } from 'react';
import regionData from '../data/USregions.json';

interface RegionSelectionProps {
    onSelect: (selectedRegion: Region | null) => void;
}

interface Region {
    abbreviation: string,
    name: string;
}

const RegionSelection: FC<RegionSelectionProps> = ({onSelect}) => {
    const regions: Region[] = regionData.data;
    const regionName = regions.map((region: Region) => <option key={region.abbreviation}>{region.name}</option>)

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const selectedOption = event.target.value;
        const selectedRegion = regions.find((region: Region) => region.name === selectedOption)
        onSelect(selectedRegion || null)
    }

    return (
        <div className="region-dropdown">
                <select name="regions" onChange={handleSelectChange}>
                    <option value="none">Please select a region</option>
                    {regionName}
                </select>
        </div>
    )
}


export default RegionSelection;