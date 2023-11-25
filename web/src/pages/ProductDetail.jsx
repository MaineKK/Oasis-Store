import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getReviewsByProduct, createReview } from '../services/api-services';
import { addToCart } from '../services/api-services';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const { productId } = useParams();

  
  useEffect(() => {
    if (productId) {
      getProductById(productId)
        .then(productData => {
          setProduct(productData);
        })
        .catch(error => {
          console.error("Error fetching product details:", error);
        });
      
      
      getReviewsByProduct(productId)
        .then(reviewsData => {
          setReviews(reviewsData);
        })
        .catch(error => {
          console.error("Error fetching reviews:", error);
        });
    }
  }, [productId]);
  

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
  }
   

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const reviewData = {
      product: productId,
      text: reviewText,
      rating: rating,
      
    };

    createReview(productId, reviewData)
      .then((newReview) => {
        setReviews([...reviews, newReview]);
        setReviewText('');
        setRating(5);
       
      })
      .catch(error => {
        console.error("Error creating review:", error);

      });
  };
    
  if (!product) {
    return <div>Cargando detalles del producto...</div>;
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="md:flex-1">
            <img src={product.imageUrls && `http://localhost:5173/${product.imageUrls[0]}`} alt={product.name} className="w-full h-auto mb-4" />
          </div>
          <div className="md:flex-1 md:ml-8">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg mb-4">
              <span className="text-red-600">{product.price}€</span>
            </p>
               <button className="bg-rose-500 text-white px-12 py-2 rounded hover:bg-lime-600 transition duration-300" onClick={() => handleAddToCart(product)}>
              Añadir a la cesta
            </button>
          </div>
        </div>
      </div>
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
        <form onSubmit={handleSubmitReview}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Dinos tu opinión"
            className="w-full p-2 border rounded mb-2"
            required
          ></textarea>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mb-4"
          >
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Enviar Reseña
          </button>
        </form>
        {reviews.map((review) => (
  <div key={review._id} className="border-t border-gray-300 mt-4 pt-4">
    <p className="text-gray-600">{review.text}</p>
    <div className="flex items-center">
      {Array.from({ length: review.rating }).map((_, index) => (
        <span key={index} className="text-yellow-500 text-xl">&#9733;</span>
      ))}
      <Link
        to={`/profile/${review.user._id}`}
        className="text-sm text-blue-500 hover:underline"
      >
        {review.user.name}
      </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;