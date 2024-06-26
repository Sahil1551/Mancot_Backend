import React, { useState,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import '../index.css'
const ProductCategory = () =>{
  const [product,setproduct]=useState([])
  const {category}=useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/products/category/${category}`);
        setproduct(response.data.Products || []); // Assuming the response data contains the products array
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProduct();
  }, [category]);
  return (
<>        
<div className='category oswald-bold'>
        {
            product.map((products)=>(
                <div className='inner-category' key={products._id}>
                   <img src={products.images[0]} alt={products.name} />
              <h2>{products.name}</h2>
              <h4>Rs. {products.price}</h4>
              {/* Use Link or history.push for navigation */}
                <button>View</button>
                </div>
            ))
        }
        </div>
        </>
   )
}
export default ProductCategory