import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [cartId, setCartId] = useState(null);

  return (
    <CartContext.Provider value={{ count, setCount, userId, setUserId, cartId, setCartId }}>
      {children}
    </CartContext.Provider>
  );
};
