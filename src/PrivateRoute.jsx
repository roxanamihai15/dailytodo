import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { projectAuth } from './firebase'
import { getAuth } from 'firebase/auth'
import Homepage from './pages/Homepage'

function PrivateRoute() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                console.log('Logged in: ' + user.uid);
                console.log(user);
                setLoggedIn(true);
            } else {
                console.log('Not logged in');
                setLoggedIn(false);
            }
            setAuthChecked(true); // Indicate that authentication state has been checked
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const location = useLocation();

    if (!authChecked) {
        // If authentication state is still being checked, you can render a loading indicator
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
            <Homepage />
        ) : (
            <Navigate to="/" state={{ from: location }} replace />
        )}

        {/* {projectAuth.currentUser ? (
                <Outlet />
            ) : (
                <Navigate to="/" state={{ from: location }} replace />
            )
        } */}
    </>
  )
}

export default PrivateRoute