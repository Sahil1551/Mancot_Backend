import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import Shoes from '/Shoes.jpg'
import Shirts from '/Shirts.jpg'
import Watch from '/watch.jpg'
import Purse from '/Purse.jpeg'
import Combo from '/Combo.jpg'
const Cards = () => {
  return (
    <div>
      <div className='Cards'>
      <div className='Card1'>
      <div className='card1'>
        <Link to='/Product/Shoes' className='card-content oswald-bold'>Shoes</Link>
        <img src={Shoes} width='200px' alt="" />
      </div>
      <div className='card2'>
        <Link to='/Product/Shirts' className='card-content oswald-bold'>Shirts</Link>
        <img src={Shirts} alt=""/>
      </div>
      </div>
      <div className='card3'>
        <Link to='/Product/Combos' className='card-content oswald-bold'>Combos</Link>
        <img src={Combo} alt="" />
      </div>  
      <div className='Card4'>
        <div className='card4'>
        <Link to='/Product/Watches' className='card-content oswald-bold'>Watches</Link>
        <img src={Watch} alt="" />          
        </div>
        <div className='card5'>
        <Link to='/Product/Purses' className='card-content oswald-bold'>Purses</Link>
        <img src={Purse} alt="" />

        </div>
      </div>
    </div>
    
    </div>
  )
}

export default Cards
