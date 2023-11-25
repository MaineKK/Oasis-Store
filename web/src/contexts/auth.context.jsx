import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from "../services/api-services";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  function onLogin(userId) {
    getUserProfile(userId).then(userData => {
      console.log("Actualizando estado de usuario con:", userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate('/profile');
    }).catch(error => {
      console.error("Error obteniendo detalles del usuario:", error);
      
    });
  }

  function onLogout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate('/login'); 
  }

  const value = {
    user,
    onLogin,
    onLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
