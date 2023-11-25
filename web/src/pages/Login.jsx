import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/auth.context'; 
import { loginUser, getUserProfile } from '../services/api-services';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, onLogin } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect - user:', user);
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    loginUser({ email, password })
      .then(response => {
        if (response.userId) {
          getUserProfile().then(userData => {
            onLogin(userData);
            navigate('/profile');
          }).catch(error => {
            console.error('getUserProfile - Error obteniendo detalles del usuario:', error);
            setError('No se pudieron obtener los detalles del usuario.');
          });
        } else {
          setError('Inicio de sesión exitoso, pero no se recibió el ID del usuario.');
        }
      })
      .catch(error => {
        console.error('handleSubmit - Error en loginUser:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
        }
      });
  };
  
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              LOGIN
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
  
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
  
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          </form>
          <div className="text-center">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Not a member? Register now
            </a>
            
          </div>
        </div>
      </div>
    );
  }
export default Login;