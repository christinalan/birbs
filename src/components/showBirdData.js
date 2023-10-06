import './style.css';

function ShowBirdData({birdData}) {
    // const cappedData = data.slice(0, 50);

    const birdNames = [];
    birdNames.push(birdData.map(bird => bird.comName + ', '))

    if (!birdData) {
        return <div>Data is loading...</div>
    }

    console.log(birdData);

    return (
        <div>
            <p className="bird-data">{birdNames}</p>
        </div>
    )
}

export default ShowBirdData;