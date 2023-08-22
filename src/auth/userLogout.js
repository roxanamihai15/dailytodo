import { signOut } from 'firebase/auth';

let error = null;

const logOut = async () => {
    error = null;

    try {
        await signOut
    } catch (err) {
        error = err.message;
    }
}

const userLogout = () => {
    return { error, logOut }
}

export default userLogout