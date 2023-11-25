import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/auth.context';
import { getUserProfile, getOrdersByUserId } from '../services/api-services'; // Importa getOrdersByUserId

function Profile() {
  const { user } = useAuthContext();
  const [profileData, setProfileData] = useState({
    name: '',
    sureName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      cp: '',
      city: '',
    },

    
  });
  const [orders, setOrders] = useState([]); // Estado para almacenar los pedidos
  const [loading, setLoading] = useState(true);
  const { onLogout } = useAuthContext();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const userId = user.id || user._id;
    getUserProfile(userId)
      .then(data => {
        // Asegúrate de mapear los campos de la respuesta a tu estado
        setProfileData({
          username: data.username,
          name: data.name,
          surname: data.surname,
          phone: data.phone,
          email: data.email,
          street: data.address?.street,
          city: data.address?.city,
          cp: data.address?.cp,
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener el perfil del usuario:", error);
        setLoading(false);
      });


    getUserProfile(userId)
      .then(profileData => {
        setProfileData(profileData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener el perfil del usuario:", error);
        setLoading(false);
      });

    getOrdersByUserId(userId)
    .then(ordersData => {
      setOrders(ordersData.map(order => ({
        ...order,
        displayId: Math.floor(1000 + Math.random() * 9000) 
      })));
    })
    .catch(error => {
      console.error("Error al obtener los pedidos del usuario:", error);
    });

}, [user]);

const handleLogout = () => {
  onLogout();
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProfileData(prev => ({ ...prev, [name]: value }));
};


const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Datos del formulario enviados:', profileData);
};

if (loading) {
  return <div>Loading...</div>;
}

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold text-center mb-6">MIS DATOS</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="firstName" 
            type="text" 
            placeholder="First Name"
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="lastName" 
            type="text" 
            placeholder="Last Name"
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email" 
            type="email" 
            placeholder="Email Address"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="street" 
            type="text" 
            placeholder="Street Address"
            name="street"
            value={profileData.street}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex mb-4">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="city" 
              type="text" 
              placeholder="City"
              name="city"
              value={profileData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="state" 
              type="text" 
              placeholder="State / Province"
              name="state"
              value={profileData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
              
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="zip" 
              type="text" 
              placeholder="ZIP / Postal Code"
              name="zip"
              value={profileData.zip}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Save Changes
          </button>
        </div>
      </form>

      <div className="my-4">
        <h2 className="text-lg font-semibold mb-2">Tus Pedidos</h2>
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.displayId} className="mb-4">
              <p>Pedido #{order.displayId} - Estado: {order.status}</p>
              <div>
                {order.products && order.products.map(product => (
                  <div key={product.id} className="flex items-center mb-2">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 mr-2" />
                    <div>
                      <p>Producto: {product.name}</p>
                      <p>Cantidad: {product.quantity}</p>
                      <p>Precio: {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No tienes pedidos realizados.</p>
        )}
      </div>

      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Profile;