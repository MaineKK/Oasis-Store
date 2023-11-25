import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../services/api-services';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../services/api-services';

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParameters = [];
  
    if (queryParams.get('category')) {
      queryParameters.push(`category=${queryParams.get('category')}`);
    }
    if (queryParams.get('petFriendly') && queryParams.get('productType') === 'plant') {
      queryParameters.push(`petFriendly=${queryParams.get('petFriendly')}`);
    }
  
    const queryString = queryParameters.length > 0 ? `?${queryParameters.join('&')}` : '';
  
    getProducts(queryString).then((data) => {
      setProducts(data);
    });
  }, [location]);
  

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (product) => {
    const cartItem = {
        productId: product._id,
        quantity: 1, 
        unitPrice: product.price 
    };

    addToCart(cartItem)
        .then(() => {
            console.log("Producto añadido al carrito");
        
        })
        .catch(error => {
            console.error("Error añadiendo producto al carrito:", error);
        });
};

return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {products.map((product) => (
      <div key={product._id} className="group">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div className="relative" onClick={() => handleProductClick(product._id)}>
            <img src={product.imageUrls[0]} alt={product.name} className="w-full h-74 object-cover group-hover:opacity-75" />
            {product.imageUrls[1] && (
              <img src={product.imageUrls[1]} alt={product.name} className="absolute top-0 left-0 w-full h-74 object-cover opacity-0 group-hover:opacity-100" />
            )}
          </div>
         <div className="p-5">
            <h3 className="font-bold text-center">{product.name}</h3>
            <p className="text-gray-500 overflow-hidden h-14 text-ellipsis overflow-hidden">{product.description}</p>
         <div className="mt-2">
           <span className="text-lg font-bold">{product.price}</span>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="text-white bg-black rounded px-4 py-2 transition-colors duration-200 transform bg-opacity-90 hover:bg-opacity-100 focus:bg-opacity-100 focus:outline-none" >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  
);
}

export default Products;

  