import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        Mobile: parseInt(formData.get('Mobile')), 
        password: formData.get('password')
      };

      // Make POST request to register user
      const response = await axios.post(`${window.location.origin}/user/register`, userData);
      
      // Reset the form after successful submission
      e.target.reset();

      // Redirect to login page (using React Router)
      window.location.href = `${window.location.origin}/Login`;
    } catch (err) {
      alert("User not registered. Please try again.");
      console.error('Error submitting the form:', err);
    }
  };

  return (
    <div className="abc">
      <div className='Register'>
        <h1 className='oswald-bold'>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' name='name' placeholder='Name' required />
          <input type='email' name='email' placeholder='Email' required />
          <input type='tel' name='Mobile' placeholder='Mobile' required />
          <input type='password' name='password' placeholder='Password' required />
          <button type='submit'>Submit</button>
          <p>Already Have An Account? <Link className='Links' to='/Login'>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
