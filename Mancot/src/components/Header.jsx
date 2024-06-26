import React, { useContext,useState, useEffect } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import axios from 'axios';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import '../index.css';
import './navbar.css';

const Header = () => {
  const [user, setUser] = useState(null); // State to hold user data
  const { count, setCount } = useContext(CartContext);
  const accessToken = localStorage.getItem('accesstoken'); // Retrieve accessToken from localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (accessToken) {
          const response = await axios.get(`${window.location.origin}/user/info`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUser(response.data); // Set user data to state
        } else {
          console.log('accessToken not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchUserData(); // Fetch user data on component mount or when accessToken changes

  }, [accessToken]); // Run effect when accessToken changes

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`${window.location.origin}/api/addToCart/${user._id}`);
          setCount(response.data.products.length); // Update count based on fetched cart data
        }
      } catch (error) {
        console.error('Error fetching cart information:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchCart(); // Fetch cart data when user or user._id changes

  }, [user]); // Run effect when user or user._id changes

  const handleLogout = async () => {
    try {
      await axios.get(`${window.location.origin}/user/logout`); 
      localStorage.removeItem('accesstoken');
      setUser(null);
      setCount(0); 
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  

  return (
    <div className="header oswald-bold">
      {user ? (
        <>
          <h5>Welcome, {user.name}</h5>
          <button className='button' onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/Login" className="h3"><h5>Login</h5></Link>
          <Link to="/Register" className="h3"><h5>Register</h5></Link>
        </>
      )}


      <Link to="/Cart" className="cart">
        <CiShoppingCart className="cart-icon" size={25} />
        <span className="badge">{count}</span>
      </Link>

    </div>
  );
};

export default Header;
