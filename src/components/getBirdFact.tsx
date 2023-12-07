import './style.css';
import {useState, useEffect} from 'react';

interface BirdNameProps {
    birdNameData: string;
}

interface WikipediaSearchParams {
  action: string;
  search: string;
  limit: string;
  namespace: string;
  format: string;
}


const ShowBirdFact = ({birdNameData}: BirdNameProps) => {
    const [birdName, setBirdName] = useState('');
    const [loading, setLoading] = useState(true);
    const [randomFact, setRandomFact] = useState('');
    const [image, setImage] = useState('');
     
    useEffect(() => {
        

        const fetchFactData = async () => {
            
            if (birdNameData.trim() !== '') {
                setBirdName(birdNameData);
                const formattedName = encodeURIComponent(birdNameData.trim());
                // const formattedName = birdNameData.replace(/\s+/g, '_');

                try {
            
                    const newApiUrl = `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&format=json&srsearch=${formattedName}&utf8=1`;

                    const testUrl = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&titles=mallard`


                    const apiUrl = "https://en.wikipedia.org/w/api.php?" +
                    new URLSearchParams({
                        origin: "*",
                        action: "parse",
                        page: formattedName,
                        format: "json",
                    });
    
                    const response = await fetch(newApiUrl);
                    const data = await response.json();
                    
                    if (response.ok && data.query && data.query.search && data.query.search.length > 0) {
                        
                        
                        const pageId = data.query.search[0].pageid;
                        const title = data.query.search[0].title;
                        
                        // Now that we have the page title, fetch the extract
                        const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&pageids=${pageId}`;
                        const extractResponse = await fetch(extractUrl);
                        const extractData = await extractResponse.json();
                        
                        if (extractResponse.ok) {
     
                            const pageContent = extractData.query.pages[pageId].extract
                            
                            //to see if there are images
                            const hasImages = /<img[^>]*>/.test(pageContent)
        
                            // Extracting a random informative paragraph
                            const informativeParagraphs = pageContent.split('\n').filter((p: string | any[]) => p.length > 100);
                            const randomFact = informativeParagraphs[Math.floor(Math.random() * informativeParagraphs.length)];
                            const firstFact = informativeParagraphs[0].replace(/<[^>]*>/g, '')
                     
                            setRandomFact(firstFact)
                        }
                        
                        const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=pageimages&format=json&piprop=thumbnail&pithumbsize=600&titles=${title}`
                        const imageResponse = await fetch(imageUrl);
                        const imageData = await imageResponse.json();

                        if (imageResponse.ok) {
                            const imageObject = imageData.query.pages[pageId].thumbnail
                            setImage(imageObject.source);
                        }
                        
                    }
                    
                    if (data.error) {
                        throw new Error(`Error: ${data.error.info}`);
                    }
    
                } catch(err) {
                    // console.error('could not fetch', err);
                } finally {
                    setLoading (false);
                }
            }
        }

        fetchFactData();
    }, [birdNameData])
    

    if (loading) {
        return <p className="ml-5">Loading...</p>;
      }

    return (
        <div className="bird-fact bg-sky-100 max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl rounded-xl px-10 py-5 mt-2 overflow-y-scroll">
            <h3 className="font-normal text-2xl uppercase pt-3">{birdName} Fact</h3>
            <p className="font-light mt-2">{randomFact}</p>
            {image !== "" ? <img className="bird-image max-w-xs mt-5 pb-5" src={image} alt={`picture of ${birdName}`}></img> : <p>No image found</p>}
            
        </div>
    )
}

export default ShowBirdFact;




