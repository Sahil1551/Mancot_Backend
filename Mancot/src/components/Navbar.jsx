
import React from 'react'
import './navbar.css'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <>
        <div className='navbar oswald-bold'>
            <Link to="/" className='Link'><h2>mancot <h6>mens clothing</h6></h2></Link> 
            <div className='ele'>
            <Link className='About' to='/About'><h2>About Us</h2></Link>
            
            <Link className='About' to='/Product'><h2>Products</h2></Link>
            
            <Link className='About' to='/Contact'><h2>contact us</h2></Link>
            </div>
        </div> 
    </>
  )
}

export default Navbar
