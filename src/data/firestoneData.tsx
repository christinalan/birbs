import { useEffect } from 'react'
import { initializeApp  } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth"
import { getFirestore, setDoc, addDoc, collection, getDocs } from 'firebase/firestore'

interface BirdData {
    comName: string
}

interface FirestoneDataProps {
    app: ReturnType<typeof initializeApp>,
    birdData: BirdData[];
}

function FirestoneData({app, birdData}: FirestoneDataProps) {
    const db = getFirestore(app);

    const storeFirestone = async () => {
        try {
            //promise.all and map over the bird Data to store each into Firestone
            const promises = birdData.map(async (birdObject) => {
                const docRef = await addDoc(collection(db, 'birds'), birdObject)
            })
                //wait for all promises to complete
            await Promise.all(promises);
        
            } catch (e) {
                console.error("error adding document: ", e)
            }

     }

    useEffect(() => {
        if (birdData.length > 0) {
            // storeFirestone();
        }

    },[birdData])


    if (!birdData) {
        return <div>Data is loading...</div>
    }
    
    
    return (
        <div></div>
    )
}

export default FirestoneData;