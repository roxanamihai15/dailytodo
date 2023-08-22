import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { projectAuth } from './firebase'


function PrivateRoute() {

    const location = useLocation()

  return (
    <>

        {projectAuth.currentUser ? (
                <Outlet />
            ) : (
                <Navigate to="/auth" state={{ from: location }} replace />
            )
        }
    </>
  )
}

export default PrivateRoute