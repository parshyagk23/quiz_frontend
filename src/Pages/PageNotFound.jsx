import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFond = () => {
    
  return (
    <div className='pagenotfound' >
      <h1>404</h1>
      <p>Page not found</p>
      <p>Oops!, the page you looking for does not exist</p>

     <Link to='/dashboard' style={{textDecoration:"none"}} >
     <div>
       
        <button>Back to home</button>
      </div>
     </Link> 
    </div>
  )
}

export default PageNotFond