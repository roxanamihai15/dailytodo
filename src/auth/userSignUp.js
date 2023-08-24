// import { projectAuth } from '../firebase'
import { auth } from '../firebase'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { getFirestore, collection, addDoc } from "firebase/firestore";

// Inizializza l'autenticazione e il database
const database = getFirestore();

let error = null;
// const auth = getAuth();

const signUp = async ( email, password) => {
    error = null;

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // return db.collection('users').doc(auth.user.uid)

        error = null;
        console.log(res.user);
        console.log("User signed in successfully.");

        if (!res) {
            throw new Error('Qualcosa è andato storto')
        } 

        if (res.user) {
            // Ottieni l'ID univoco dell'utente
            const userId = res.user.uid;
            console.log('qui ci entro?');

           // Creazione di una nuova task nella collezione "tasks" per l'utente
        const tasksCollection = collection(database, "users", userId, "tasks");
        await addDoc(tasksCollection, {
            title: "benvenuto!",
            completed: false
        });

    
            console.log("Task added successfully.");
        }

        console.log('sono qui? try');
        // return res
        return null
    } catch (err) {
        error = err.message;
        console.error("Error signing in:", error);
        console.log(error);
        return error
    }

    
}

const userSignUp = () => {
    return { error, signUp }
}

export default userSignUp