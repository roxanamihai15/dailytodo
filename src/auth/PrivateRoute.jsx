import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
// import { projectAuth } from './firebase'
import { getAuth } from 'firebase/auth'

function PrivateRoute() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
            setAuthChecked(true); // check dell'auth
        });

        return () => {
            unsubscribe();
        };
    }, []);


    if (!authChecked) {
        // visibile finchè non si fa il check dell'auth
        return (
            <div className="container-loading">
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }

  return (
    <>
        {loggedIn ? (
            <Outlet />    //in questo caso la mia <Route> contiene solo 1 <Route> children, la home, ma se fossero di più Outlet comprende anche quelle
        ) : (
            <Navigate to="/" state={{ from: location }} replace />
        )}
    </>
  )
}

export default PrivateRoute