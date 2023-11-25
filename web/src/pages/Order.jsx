import React, { useEffect, useState } from 'react';
import { getOrdersByUserId } from '../services/api-services';


function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = user.id || user; 
        getOrdersByUserId(userId)
          .then(ordersData => {
            setOrders(ordersData);
            setLoading(false);
          })
          .catch(error => {
            console.error("Error al obtener pedidos:", error);
            setLoading(false);
          });
      }, []);

      return (
        <div>
          <h1 className="text-2xl font-bold">Mis Pedidos</h1>
          {loading ? (
            <div>Cargando pedidos...</div>
          ) : (
            <ul>
              {orders.map(order => (
                <li key={order.id} className="my-4 p-4 bg-gray-100 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">
                    Número de Pedido: {order.id}
                  </h2>
                  <p>Estado: {order.status}</p>
                  {/* Me falta agregar detalles  */}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
  }
      export default Orders;