import './App.css';
import { initializeApp  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
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

  function signIn() {
     //google access token to access Google API
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      //signed in user info
      const user = result.user
      console.log(user);
    }).catch((error) => {
      const errorCode = error.errorCode;
      console.error(error.message);
    })
  }

  function signOut() {
    signOut(auth).then(() => {
      console.log("signed out" + auth);
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        Hello!
        <div className="buttons">
          <button className="btn" onClick={signIn}>Sign In</button>
          <button className="btn" onClick={signOut}>Sign Out</button>
        </div>
      </header>
    </div>
  );
}

export default App;
