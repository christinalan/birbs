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
        return <div className="text-lg ml-3">Data is loading...</div>
    } 


    const getBirdName = (bird: Bird) => {
        setBirdName(bird.comName);
        setClicked(true);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;

    }
    
    return (
        <div className="bird-container flex text-slate-700">
            <div className="bird-list mt-2 pl-1 pb-3 text-base border-2 leading-7 text-slate-700 text-left cursor-pointer max-h-96 overflow-scroll">
                {birdData ? birdData.map((bird) => (
                    <div key={bird.comName}>
                    <p onClick={() => getBirdName(bird)} >{bird.comName}</p>
                    </div>
                )) : <p className="text-neutral-900" >No birds spotted here recently &#128532;</p>}
            </div>
            <div>
                 {clicked ? <GetBirdFact birdNameData={birdName}/> : null}
            </div>
        </div>
    )
}

export default ShowBirdData;