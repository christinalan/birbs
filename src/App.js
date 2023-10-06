import './App.css';
import { initializeApp  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect } from 'react'
import BirdData from './components/gettingBirdData.js'
import FirebaseLogin from './components/login.js';


function App() {
  return (
    <div className="App">
  
      <FirebaseLogin />
  
    </div>
  );
}

export default App;
