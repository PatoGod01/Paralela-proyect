import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-indigo-100">
      <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Sistema de Exámenes</h1>
        <p className="text-gray-500 mb-8 text-center text-base">
          Gestiona exámenes, aplicantes y sesiones de forma sencilla y eficiente.<br/>
          Procesamiento paralelo, reportes y más.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors w-full"
        >
          Iniciar sesión
        </button>
      </div>
      <footer className="mt-8 text-xs text-gray-400">Desarrollado con ❤️ por tu equipo</footer>
    </div>
  );
}
