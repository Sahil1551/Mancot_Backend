import React,{useContext} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../index.css';
import {CartContext} from './CartContext'
Modal.setAppElement('#root'); // Ensure accessibility

const CheckoutForm = ({ isOpen, onRequestClose, cart, price }) => {
  const{userId,setUserId,cartId,setCartId}=useContext(CartContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      userId:userId,
      cart:cartId,
      name: formData.get('name'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      pincode: formData.get('pincode'),
      address: formData.get('address'),
      price: price,
      razorpayid: null, 
  razorpaypaymentid: null 
    };

    try {
      const keyResponse = await axios.get(`${window.location.origin}/api/key`);
      const checkoutResponse = await axios.post(`${window.location.origin}/api/CheckOutdetails`, data);
      const { id: order_id } = checkoutResponse.data;

      const options = {
        key: keyResponse.data.key, // Enter the Key ID generated from the Dashboard
        amount: price * 100, // Amount in currency subunits. Default currency is INR.
        currency: "INR",
        name: "Sahil",
        description: "Test Transaction",
        image: "http://example.com/your_logo",
        order_id: order_id, // Order ID obtained in the response of Step 1
        callback_url: `${window.location.origin}/api/paymentVerifcation`,
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.mobile,
        },
        notes: {
          address: data.address,
        },
        theme: {
          color: "#121212",
        },
          
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on('payment.failed', (response) => {
        console.error(response.error);
        alert('Payment failed');
      });
    } catch (error) {
      console.error('Checkout failed', error);
      alert('Checkout failed. Please try again.');
    }
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className='oswald-bold CheckoutForm'>
        <h1>CheckOut</h1>
        <form onSubmit={handleSubmit}>
          <h2>
            Name: <input type="text" name="name" required />
          </h2>
          <h2>
            Email: <input type="email" name="email" required />
          </h2>
          <h2>
            Mobile: <input type="tel" name="mobile" required />
          </h2>
          <h2>
            PinCode: <input type="number" name="pincode" required />
          </h2>
          <h2>
            Address: <input className='cs' type="text" name="address" required />
          </h2>
          <h2>Total Price: {price}</h2>
          <button type='submit'>Proceed To Payment</button>
        </form>
      </div>
    </Modal>
  );
};

export default CheckoutForm;
