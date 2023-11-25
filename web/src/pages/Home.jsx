import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api-services';
import HomeImage from '../assets/home.png'

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then((data) => {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 4));
    });
  }, []);

  const handleViewProducts = () => {
    navigate('/products'); 
  };

  return (
    <div className="container mx-auto">
      <div className="relative text-center">
        <div className="relative">
        <img src={HomeImage} alt="Encabezado de la página de inicio" className="w-full" />
          <button onClick={handleViewProducts}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-black px-20 py-6 text-lg rounded-lg shadow transition duration-300">
            Busca tu planta ideal
          </button>
      </div>
    </div>
      <div className="my-8">
        <h2 className="text-2xl font-bold text-center mb-6">NOVEDADES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredProducts.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}> {/* Enlace a los detalles del producto */}
              <div className="shadow-lg rounded-lg overflow-hidden">
                <img src={`http://localhost:5173/${product.imageUrls[0]}`} alt={product.name} className="w-full h-auto mb-4" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;