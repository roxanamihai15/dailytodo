import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { projectAuth } from '../firebase'
import { auth } from '../firebase'


let error = null;
// const auth = getAuth();


const login = async ( email, password) => {
    error = null;

    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        error = null;
        console.log(res.user);
        console.log("User signed in successfully.");
        // return res
        return null; // Nessun errore in caso di successo
    } catch (err) {
        error = err.message;
        console.error("Error signing in:", error);
        console.log(error);

        return error
    }
}

const userLogin = () => {
    return { error, login }
}

export default userLogin