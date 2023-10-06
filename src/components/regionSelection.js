import regionData from '../data/USregions.json';

function RegionSelection({onSelect}) {
    const regions = regionData.data
    const regionName = regions.map((region) => <option key={region.abbreviation}>{region.name}</option>)

    // const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (event) => {
        event.preventDefault();
        const selectedOption = event.target.value;
        const selectedRegion = regions.find((region) => region.name === selectedOption)
        onSelect(selectedRegion)
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