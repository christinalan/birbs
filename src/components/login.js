import { initializeApp  } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from 'react'
import LoggedInInfo from "./loggedIn";
import FirestoneData from '../data/firestoneData';

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

    // const db = getFirestore(app);
    // console.log(db);

    const [user, loading] = useAuthState(auth);
    const [message, setMessage] = useState('')

    function signIn() {
        //google access token to access Google API
        signInWithPopup(auth, provider).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          
          //signed in user info
          const user = result.user
    
        }).catch((error) => {
          const errorCode = error.errorCode;
          console.error(error.message);
        })
      }
      
      function signOutUser() {
        signOut(auth).then(() => {
          console.log("signed out");
        }).catch((error) => {
          console.error(error);
        })
      }

  useEffect(() => {
    if (loading) {
      setMessage('');
    }
    else if (user) {
      //signed in
      setMessage(
      <div>
        <p>
          Welcome to birding, {user.displayName}
        </p>
        <LoggedInInfo />
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
              Birds Today!
              <div className="buttons">
              <button className="btn" onClick={signIn}>Sign In</button>
              <button className="btn" onClick={signOutUser}>Sign Out</button>
              </div>
              <div className="message">{message}</div>
          </header>
          {/* <FirestoneData firestoneApp={app}/> */}
        </div>
    );
  }

export default FirebaseLogin;