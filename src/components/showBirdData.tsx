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
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;

    }
    
    return (
        <div className="bird-container">
            
            {clicked ? <GetBirdFact birdNameData={birdName}/> : null}

        <div className="bird-list">
            {birdData ? birdData.map((bird) => (
                <div key={bird.comName}>
                <p onClick={() => getBirdName(bird)} >{bird.comName}</p>
                </div>
            )) : <p>No birds spotted here recently &#128532;</p>}
        </div>
        </div>
    )
}

export default ShowBirdData;