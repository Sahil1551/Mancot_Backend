import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import '../index.css';
import { FaSearch } from "react-icons/fa";

const Product = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/category`);
        setCategories(response.data);
        if (category) {
          const foundCategory = response.data.find(cat => cat.category === category);
          if (foundCategory) {
            setSelectedCategories([foundCategory._id]);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/products`);
        setProducts(response.data.Products || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
    fetchCategory();
  }, [category]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prevSelectedCategories => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter(catId => catId !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  const filteredProducts = products.filter(product =>
    selectedCategories.length === 0 || selectedCategories.includes(product.category)
  );
  return (
    <>
      <div className='productMenu'>
        <div className='leftMenu oswald-bold'>
          <div className='input'>
            <input type="text" placeholder='search' />
            <button><FaSearch /></button>
          </div>
          <h3>Categories</h3>
          {categories.map((cat) => (
            <div className='innerCategory' key={cat._id}>
              <h5>
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange(cat._id)}
                  checked={selectedCategories.includes(cat._id)}
                  name={cat.category}
                  id={cat._id}
                />
                {cat.category}
              </h5>
            </div>
          ))}
        </div>
        <div className='productList '>
          {filteredProducts.map(product => (
            <div key={product._id} className='productItem'>
              <img src={product.images[0]} alt={product.name} />
              <h4 className='oswald-bold'>{product.name}</h4>
              <p className='desc'>{truncateDescription(product.description, 40)}</p>
              <p className='oswald-bold'>Rs.{product.price}</p>
              <Link to={`Order/${product._id}`}><button >View</button></Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
