import { browserLocalPersistence, getAuth, setPersistence, signOut } from 'firebase/auth';
import { auth } from '../firebase'

let error = null;

const logOut = async () => {
    error = null;

    try {
        await signOut(auth)
        return null
    } catch (err) {
        error = err.message;
    }
}

const userLogout = () => {
    return { error, logOut }
}

export default userLogout