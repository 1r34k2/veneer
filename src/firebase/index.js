import firebase from "firebase/compat/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDNtmhyR0CM3hoXnlzg_kOA_u2s6Sym7OI",
    authDomain: "diploma-79d68.firebaseapp.com",
    projectId: "diploma-79d68",
    storageBucket: "diploma-79d68.appspot.com",
    messagingSenderId: "217074992668",
    appId: "1:217074992668:web:c625119abeff1e20fcc1d9",
    measurementId: "G-KEDK01LJ1L"
  };

const app = firebase.initializeApp(firebaseConfig);

const storage = getStorage(app)

export {storage, firebase as default}