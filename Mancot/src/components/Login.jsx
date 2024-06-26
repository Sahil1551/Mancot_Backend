import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Login = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const formData = new FormData(e.target);
          const userData = {
            email: formData.get('email'),
            password: formData.get('password'),
          };
          const response = await axios.post(`${window.location.origin}/user/Login`, userData);
          console.log(response.data)
          const a=response.data.accesstoken
          localStorage.setItem('accesstoken',a)
          
          e.target.reset();
          window.location.href='/'
        } catch (err) {
          alert('Login failed. Please try again.');
        }
      };
    
    return (
      <div className='BG-Image'>
    <div className='Login'>
      <form onSubmit={handleSubmit}>
        <h1 className='oswald-bold'>Login</h1>
        <input type="email" name="email" placeholder='Enter Email' required/>
        <input type="password" name="password" placeholder='Enter password' required/>
        <button type="submit">Submit</button>
        <p className='oswald-bold'>Dont have An Accout? <Link className='Links' to='/Register'>Register</Link></p>
      </form>
    </div>
    </div>
  )
}

export default Login
