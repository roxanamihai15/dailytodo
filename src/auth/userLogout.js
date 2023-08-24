import { browserLocalPersistence, getAuth, setPersistence, signOut } from 'firebase/auth';
import { auth } from '../firebase'

let error = null;

const logOut = async () => {
    error = null;

    try {
        await signOut(auth)
        console.log('logout function: success logout');
        return null
    } catch (err) {
        error = err.message;
        console.log(error);
    }
}

const userLogout = () => {
    return { error, logOut }
}

export default userLogout