import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.REACT_APP_BASE_API_URL || "http://localhost:3000/v1",
});

api.interceptors.response.use(
  response => response.data,
  error => {
    console.log("Interceptor de error Axios activado", error);
    if (error.response && error.response.status === 401 && window.location.pathname !== "/login") {
      console.log("Redirigiendo a /login debido a error 401");
      localStorage.removeItem("user");
      window.location.assign("/login");
    } else {
      return Promise.reject(error);
    }
  }
);

// Usuarios
export function registerUser(data) {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    if (key === 'avatar' && data.avatar) {
      formData.append("avatar", data.avatar[0]);
    } else {
      formData.append(key, data[key]);
    }
  });

  return api.post("/register", formData);
}

export function loginUser(data) {
  return api.post("/login", data);
}

export function getUserProfile() {
  return api.get("/profile");
}

export function logoutUser() {
  return api.post("/logout");
}

// Productos

export function getProducts(query = '') {
  return api.get(`/products${query}`);
}

export function getProductById(productId) {
  return api.get(`/products/${productId}`);
}

// Pedidos
export function createOrder(data) {
  return api.post("/orders", data);
}

export function getOrdersByUserId(userId) {
  return api.get(`/orders/user/${userId}`);
}

export function cancelOrder(orderId) {
  return api.put(`/orders/${orderId}/cancel`);
}

export function confirmOrder(orderId) {
  return api.put(`/orders/${orderId}/confirm`);
}

export function getOrderOfUser(userId, orderId) {
  return api.get(`/user/${userId}/orders/${orderId}`);
}

// Carrito
export function getCart() {
  return api.get("/cart");
}

export function addToCart(data) {
  return api.post("/cart", data);
}

export function updateCartItem(productId, data) {
  return api.put(`/cart/${productId}`, data);
}

export function removeFromCart(productId) {
  return api.delete(`/cart/${productId}`);

}

export function checkoutOrder(orderData) {
  return api.post("/checkout", orderData);
}

// Reseñas
export function createReview(productId, data) {
  return api.post(`/products/${productId}/reviews`, data);
}

export function getReviewsByProduct(productId) {
  return api.get(`/products/${productId}/reviews`);
}

export default api;