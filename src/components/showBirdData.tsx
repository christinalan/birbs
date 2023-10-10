import './style.css';

interface Bird {
    comName: string;
}

interface ShowBirdDataProps {
    birdData: Bird[];
}

function ShowBirdData({birdData}: ShowBirdDataProps) {
    // const cappedData = data.slice(0, 50);

    const birdNames: string[] = [];

    birdNames.push(birdData.map(bird => bird.comName).join(', '))

    if (!birdData) {
        return <div>Data is loading...</div>
    }

    return (
        <div>
            <p className="bird-data">{birdNames}</p>
        </div>
    )
}

export default ShowBirdData;