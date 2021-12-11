import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyANbJcPDqwy-Gr9zbKUCVQBozhSzhoOxb8",
    authDomain: "disneyplus-clone-50bd4.firebaseapp.com",
    projectId: "disneyplus-clone-50bd4",
    storageBucket: "disneyplus-clone-50bd4.appspot.com",
    messagingSenderId: "725553713125",
    appId: "1:725553713125:web:11e626b524289d0254690c",
    measurementId: "${config.measurementId}"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export {auth, signInWithPopup, provider};

