import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Perfil = () => {
  const navigate = useNavigate();

  const nombre = cookies.get('nombres');
  const email = cookies.get('email');
  const rol = cookies.get('rol');

  const cerrarSesion = () => {
    ['id', 'nombres', 'email', 'numero', 'rol'].forEach(cookie => 
      cookies.remove(cookie, { path: "/" })
    );
    navigate("/login");
  };

  React.useEffect(() => {
    if (!cookies.get('id')) {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 shadow-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center flex-shrink-0">
                <Link to="/inicio" className="text-2xl font-bold text-white">
                  EmpresaTransporte
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/inicio" className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700">
                Inicio
              </Link>
              <Link to="/perfil" className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700">
                Perfil
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-gray-200 border-dashed rounded-lg h-96">
            <div className="max-w-md mx-auto mt-16 overflow-hidden bg-white rounded-lg shadow-lg">
              <div className="px-6 py-4 text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-800">Perfil</h1>
                <p className="text-sm text-gray-700">Información del usuario</p>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center mb-4">
                  <span className="w-24 font-bold text-gray-700">Nombre:</span>
                  <span className="text-gray-600">{nombre}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="w-24 font-bold text-gray-700">Email:</span>
                  <span className="text-gray-600">{email}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="w-24 font-bold text-gray-700">Rol:</span>
                  <span className="text-gray-600">{rol}</span>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-100">
                <button
                  className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Editar perfil
                </button>
                <button
                  onClick={cerrarSesion}
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;