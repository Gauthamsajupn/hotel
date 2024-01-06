import React from 'react'
import { Link } from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>
        <div className="col-md-10 my-auto text-center bar" >
            <h2 style={{color:'white',fontSize:'150px'}}>Emirates</h2>
            <h1 style={{color:'white'}}>"There is Only one Boss. The Guest"</h1>
            <Link to='/register'>
            <button className='btn btn-primary landing-btn' >Get Started</button>
            </Link>
            

        </div>
    </div>
  )
}

export default Landingscreen