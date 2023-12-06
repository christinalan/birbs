import { initializeApp  } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from 'react'
import LoggedInInfo from "./loggedIn.tsx";
import FirestoneData from '../data/firestoneData.tsx';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCaxrJoobxKor1mHZJxhkRWoW7ronXRkQk",
    authDomain: "fir-practice-4f291.firebaseapp.com",
    projectId: "fir-practice-4f291",
    storageBucket: "fir-practice-4f291.appspot.com",
    messagingSenderId: "165029687617",
    appId: "1:165029687617:web:3d87e983acd641a118f1c0",
    measurementId: "G-T89L1J1924"
  };

  function FirebaseLogin() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [user, loading] = useAuthState(auth);
    const [message, setMessage] = useState('')
    const [isSignedIn, setIsSignedIn] = useState(false);

    const signIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        //signed in user info
        const user = result.user
        setIsSignedIn(true);
      } catch (error) {
        const errorCode = error.errorCode;
        console.error(error.message);
      }
    }

    const signOutUser = async () => {
      try {
        await signOut(auth);
        setIsSignedIn(false);
        console.log("signed out");
      } catch (error) {
        console.error(error);
      }
    }
      

  useEffect(() => {
    if (loading) {
      setMessage('');
    }
    else if (user) {
      //signed in
      setMessage(
          <div>
            <p>Welcome to birding, {user.displayName}</p>
            {/* <LoggedInInfo /> */}
          </div>)
    } else {
      //signed out
      setMessage('Bye! Come back again')
    }
  }, [user])

  //setting up firestore


    return (
        <div className="App">
          <header className="App-header">
              <h3 className="bird-header">Birds Today!</h3>
              {/* <div className="buttons">
              <button className="btn" onClick={signIn}>Sign In</button>
              <button className="btn" onClick={signOutUser}>Sign Out</button>
              </div>*/}
            <div className="message"> <LoggedInInfo /></div> 
          </header>
  
        </div>
    );
  }

export default FirebaseLogin;