import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='error-404'>
        <h1>ErrorPage</h1>
        <p>Go to <Link to="/home">Homepage</Link></p>  
    </div>
  )
}

export default ErrorPage