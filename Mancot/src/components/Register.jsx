import React from 'react'
import '../index.css'

import axios from 'axios'
import { Link } from 'react-router-dom';
const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const formData=new FormData(e.target)
        const userData={
            name: formData.get('name'),
            email: formData.get('email'),
            Mobile: parseInt(formData.get('Mobile')), 
            password: formData.get('password')
            
        }
        const response = await axios.post(`${window.location.origin}/user/register`, userData);
        e.target.reset();  
        window.location.href='/Login'

      // Reset the form after successful submission
      

    }
    catch(err){
        alert("User not registered. Please try again.");
        console.error('Error submitting the form:', err);
    }
}
const Register = () => {
  return (
    <div className="abc">
    
    <div className='Register'>
      
    <h1 className='oswald-bold'>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name'  placeholder='Name' required/>
        <input type='email' name='email'  placeholder='Email' required/>
        <input type='tel' name='Mobile'  placeholder='Mobile' required/>
        <input type='password' name='password'  placeholder='Password' required/>
        <button type='submit'>Submit</button>
        <p>Already Have An Acount? <Link className='Links' to='/Login'>Login</Link></p>
      </form>
    </div>
    </div>
  )
}

export default Register
