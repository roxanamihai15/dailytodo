import React, { useState } from 'react'
import LoginPage from '../login/LoginPage'
import SignupPage from '../login/SignupPage'

function Authentication() {

    const [login, setLogin] = useState(true)

    const handleLogin = () => {
        setLogin(!login)
    }

  return (
    <div className='auth-container'>
        {login ? <LoginPage toggleForm={handleLogin} /> : <SignupPage toggleForm={handleLogin} />} 
    </div>
  )
}

export default Authentication