import './App.css';
import { initializeApp  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from 'react'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

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
      setMessage('Welcome to birding')
    } else {
      //signed out
      setMessage('Bye! Come back again')
    }
  }, [user])

  // function changeMessage() {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       //signedin
  //       setMessage('Welcome')
  //     } else {
  //       setMessage('Bye!')
  //     }
  //   })
  // }

  return (
    <div className="App">
      <header className="App-header">
        Hello!
        <div className="buttons">
          <button className="btn" onClick={signIn}>Sign In</button>
          <button className="btn" onClick={signOutUser}>Sign Out</button>
        </div>
        <div className="message">{message}</div>
      </header>
    </div>
  );
}

export default App;
