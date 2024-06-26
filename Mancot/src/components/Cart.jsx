import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import '../index.css';
import CheckoutForm from './CheckoutForm.jsx';
import {CartContext} from './CartContext' 
const Cart = () => {
  const {userId, setUserId, cartId, setCartId } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [c, setC] = useState({});
  const accessToken = localStorage.getItem('accesstoken');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (accessToken) {
          const response = await axios.get(`${window.location.origin}/user/info`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUser(response.data);
        } else {
          console.log('Access token not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    fetchUser();
  }, [accessToken]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        console.log("No user present. Please login.");
        return;
      }
      try {
        const response = await axios.get(`${window.location.origin}/api/addToCart/${user._id}`);
        setC(response.data);
        setCart(response.data.products);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    if (user) {
      fetchCart();
    }
  }, [user]);

  const handleClick = async (id) => {
    const response = await axios.delete(`${window.location.origin}/api/removeItem/${id}`);
    console.log(response);
    setCart(cart.filter(item => item.product._id !== id));
  };
  setUserId(c.user);
  setCartId(c._id)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCheckout = async (cart, price) => {
    openModal(); // Open the modal when the user clicks "Proceed to Checkout"
  };
  return (
    <div>
      <div className="Cartcontainer">
        {cart.map((carts) => (
          <div className='Cartc' key={carts.product._id}>
            <div className='cartImage'>
              <img src={carts.product.images} alt=''></img>
            </div>
            <div className='cartDetail'>
              <h1 className='name oswald-bold'>{carts.product.name}</h1>
              <h1 className='oswald-bold'>Price <br />Rs {carts.product.price}</h1>
              <h1 className='oswald-bold'>Quantity <br />{carts.quantity}</h1>
              <button onClick={() => handleClick(carts.product._id)}>Remove Item</button>
            </div>
          </div>
        ))}
        <div className='Checkout'>
          <h1 className='oswald-bold'>Checkout</h1>
          <h2 className='oswald-bold'>Total Price : {c.totalPrice}</h2>
          <button onClick={() => handleCheckout(cart, c.totalPrice)}>Proceed To Checkout</button>
          <CheckoutForm
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            cart={cart}
            price={c.totalPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
