import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeFromCart, updateCartItem } from '../services/api-services';



function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCart().then((cart) => {
      setCartItems(cart.items);
    });
  }, []);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId).then(() => {
      setCartItems(currentItems => currentItems.filter(item => item.product._id !== productId));
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItem(productId, { quantity: newQuantity }).then(() => {
      setCartItems(currentItems => currentItems.map(item => {
        if (item.product._id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      }));
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
  };

  const total = calculateTotal();

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
          </div>
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24" src={item.product.image} alt={item.product.name} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.product.name}</span>
                  <span className="text-red-500 text-xs">{item.product.description}</span>
                  <button onClick={() => handleRemoveFromCart(item.product._id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <input className="mx-2 border text-center w-8" type="text" value={item.quantity} onChange={(e) => handleQuantityChange(item.product._id, e.target.value)} />
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">${item.unitPrice}</span>
              <span className="text-center w-1/5 font-semibold text-sm">${(item.quantity * item.unitPrice).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
            <span className="font-semibold text-sm">€{calculateTotal().toFixed(2)}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - €00.00</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>€{calculateTotal().toFixed(2)}</span>
            </div>
            <button onClick={() => navigate('/checkout')} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full" >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
