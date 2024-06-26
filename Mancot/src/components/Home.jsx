import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Caro from './Caro';
import Header from './Header';
import Cards from './Cards';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/products`);
        
        setProducts(response.data.Products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProduct();
  }, []); // Empty dependency array to run effect only once on mount


  return (
    <>
      <Caro />
      <Cards />
      <div className='containers'>
        <h1 className='oswald-bold'>New Drops</h1>
        <div className='container'>
          {  products.filter(product => product.news === true).map((product) => (
            
            <div className='product-Cards' key={product._id}>
              {/* Assuming product.images is an array with a single image URL */}
              <img src={product.images[0]} alt={product.name} />
              <h2>{product.name}</h2>
              <h4>Rs. {product.price}</h4>
              {/* Use Link or history.push for navigation */}
                <Link to={`/Order/${product._id}`}><button>View</button></Link>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
