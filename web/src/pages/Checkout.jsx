import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkoutOrder, getCart } from '../services/api-services';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');

  const navigate = useNavigate();

  useEffect(() => {
    getCart().then(data => {
      setCartItems(data.items); 
    }).catch(error => {
      console.error('Error fetching cart:', error);
    });
  }, []);

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const totalPrice = calculateTotal(cartItems);
    const orderData = {
      orderItems: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.unitPrice
      })),
      shippingAddress: {
        address,
        city,
        postalCode,
      },
      paymentMethod,
      totalPrice
    };

    checkoutOrder(orderData)
      .then(response => {
        navigate('/order-confirmation', { state: { orderNumber: response.orderNumber } });
      })
      .catch(error => {
        console.error('Error during checkout:', error);
      });
  };
  
  return (
<div className="container mx-auto p-4">
  <div className="md:flex md:justify-between">
    <div className="md:w-1/2 mb-4 md:mb-0">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="fullName"
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nombre y Apellido"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Dirección"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ciudad"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Código Postal"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="nameOnCard"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          placeholder="Nombre en la Tarjeta"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Número de Tarjeta"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="Fecha de Caducidad (MM/AA)"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="cvc"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          placeholder="CVC"
          className="w-full p-2 mb-4 border rounded"
          required
        />
         <div>
              <label>Método de Pago:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)} >
                <option value="tarjeta">Tarjeta</option>
                <option value="paypal">PayPal</option>
                <option value="contra reembolso">Contra Reembolso</option>
              </select>
          </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition-colors">
              Confirmar Pedido 
            </button>
          </form>
     </div>
        <div className="md:w-1/3">
          <div className="border p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Resumen del Pedido</h3>
            {cartItems.map(item => (
              <div key={item.product._id} className="mb-2">
                <span>{item.product.name}</span>
                <span> - {item.quantity} x ${item.unitPrice}</span>
              </div>
            ))}
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>${calculateTotal(cartItems).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;