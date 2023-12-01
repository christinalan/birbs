import './style.css';
import {useState} from 'react'
import GetBirdFact from './getBirdFact'

interface Bird {
    comName: string;
}

interface ShowBirdDataProps {
    birdData: Bird[];
}

function ShowBirdData({birdData}: ShowBirdDataProps) {
    const [birdName, setBirdName] = useState('');
    const [clicked, setClicked] = useState(false);
    // const cappedData = data.slice(0, 50);

    // const birdNames: string[] = [];
    // birdNames.push(birdData.map(bird => bird.comName).join(', '))

    if (!birdData) {
        return <div>Data is loading...</div>
    } 

    const getBirdName = (bird: Bird) => {
        setBirdName(bird.comName);
        setClicked(true);
    }
    
    return (
        <div className="bird-container">
            
            {clicked ? <GetBirdFact birdNameData={birdName}/> : null}

        <div className="bird-list">
            {birdData.map((bird) => (
                <div key={bird.comName}>
                <p onClick={() => getBirdName(bird)} >{bird.comName}</p>
                </div>
            ))}
 
        </div>
        </div>
    )
}

export default ShowBirdData;