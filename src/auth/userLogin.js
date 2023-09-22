import { signInWithEmailAndPassword } from 'firebase/auth';
// import { projectAuth } from '../firebase'
import { auth } from '../firebase'


let error = null;

// riceverà questi 2 argomenti: email e psw
const login = async ( email, password) => {
    error = null;  //in caso ci fossero errori precedenti li cancello

    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        error = null;
        return null; // Nessun errore in caso di successo
    } catch (err) {
        error = err.message;
        return error
    }
}

const userLogin = () => {
    return { error, login }
}

export default userLogin

// queste 3 sono le proprietà degli errori firebase 
// console.log(err.message);  //msg lungo che spiega cosa è adato storto
// console.log(err.code);   //  auth/too-many-requests
// console.log(err.name);    // FirebaseError