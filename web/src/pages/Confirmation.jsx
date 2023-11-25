import React from 'react';
import { useNavigate } from 'react-router-dom';

function Confirmation() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">Pedido Realizado con Éxito</h2>
            <p className="mb-6">Tu pedido ha sido realizado y está siendo procesado.</p>
            
            <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300 mr-4">
                Ir al Inicio
            </button>

            <button
                onClick={() => navigate('/profile')}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300" >
                Ver Perfil
            </button>
        </div>
    );
}

export default Confirmation;