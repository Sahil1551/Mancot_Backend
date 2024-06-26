import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import Twitter from '/twitter.png'
import Youtube from '/youtube.png'
import Facebook from '/facebook.png'
import Instagram from '/instagram.png'

const Footer = () => {
  const handleClick=()=>{
    window.location.href='/'
  }
  return (
    <div className='Footer '>
      <div className='Title '>
            <h1 className='oswald-bold'>Mancot <br /><p className='p'>Mens Clothing</p></h1>
      </div>
      <div className='List'>
        <ul className='Ul oswald-bold'>
            <h3>About Us</h3>
            <Link className='ff' to='/About'><li>About</li></Link>
            <Link to='/Product' className='ff'><li>Products</li></Link>
            <Link to='/Contact' className='ff'><li>Contact Us</li></Link>
        </ul>
      </div>
      <div className='Social oswald-bold'>
        <h3>Social Media</h3>
        <img className='Twitter' onClick={handleClick} style={{cursor:'pointer'}} src={Twitter} alt="" />
        <img src={Instagram} onClick={handleClick} style={{cursor:'pointer'}} alt="" />
        <img src={Facebook} onClick={handleClick} style={{cursor:'pointer'}} alt="" />
        <img src={Youtube} onClick={handleClick} style={{cursor:'pointer'}} alt="" />
      </div>
    </div>
  )
}

export default Footer
