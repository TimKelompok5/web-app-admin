import { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
export const useFirebase = () => {

    const app = initializeApp({
        apiKey: "AIzaSyCrCY4TfI_1cU_7t13mmYXdv2jCwitIwbQ",
        authDomain: "timkelompok5-57b75.firebaseapp.com",
        projectId: "timkelompok5-57b75",
        storageBucket: "timkelompok5-57b75.appspot.com",
        messagingSenderId: "75276673030",
        appId: "1:75276673030:web:299b9a5a97924ffb18e387",
        measurementId: "G-8FKFGSD4EJ"
    })

    const auth = getAuth(app)
    const db = getFirestore(app)
    const bucket = getStorage(app)
    return {
        app,
        auth,
        db,
        bucket
    }
}