// import { projectAuth } from '../firebase'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Inizializza il database
const database = getFirestore();

let error = null;

const signUp = async ( email, password) => {
    error = null;

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        error = null;
        console.log("User signed in successfully.");

        if (!res) {
            throw new Error('Qualcosa è andato storto')
        } 

        if (res.user) {
            // Ottieni l'ID univoco dell'utente
            const userId = res.user.uid;
            // Creazione di una nuova task nella collezione "tasks" per l'utente
            const tasksCollection = collection(database, "users", userId, "tasks");
            await addDoc(tasksCollection, {
                title: "benvenuto!",
                completed: false
            });  
        }
        return null

    } catch (err) {
        error = err.message;
        console.error("Error signing in:", error);
        return error
    }
}

const userSignUp = () => {
    return { error, signUp }
}

export default userSignUp