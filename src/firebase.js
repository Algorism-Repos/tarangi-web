// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcskc4-q3vor-GiD6aR5jPDBzntm2XVLA",
  authDomain: "tarangi-mobile-verification.firebaseapp.com",
  projectId: "tarangi-mobile-verification",
  storageBucket: "tarangi-mobile-verification.firebasestorage.app",
  messagingSenderId: "832864647104",
  appId: "1:832864647104:web:d69273329ea3b54dfeba25",
  measurementId: "G-HG3ZPW8G0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const setUpRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      },
            auth                         

    );
  }
};