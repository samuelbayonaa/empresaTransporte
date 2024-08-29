import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {Truck, User, Mail, Briefcase, Edit, LogOut } from 'lucide-react';

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
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 shadow-lg">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Truck className="w-12 h-12 text-white" />
                <span className="ml-3 text-2xl font-bold text-white">EmpresaTransporte</span>
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <Link to="/home" className="px-3 py-2 text-sm font-medium text-white transition duration-300 rounded-md hover:bg-blue-500 hover:text-white">Inicio</Link>
                  <Link to="/inicio" className="px-3 py-2 text-sm font-medium text-white transition duration-300 rounded-md hover:bg-blue-500 hover:text-white">Gestion Camiones</Link>
                  <Link to="/perfil" className="px-3 py-2 text-sm font-medium text-white transition duration-300 rounded-md hover:bg-blue-500 hover:text-white">Perfil</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      <div className="py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Perfil de Usuario</h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">Información personal y detalles de la cuenta.</p>
          </div>
          <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="flex items-center text-sm font-medium text-gray-500">
                  <User className="w-5 h-5 mr-2 text-gray-400" />
                  Nombre completo
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{nombre}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="flex items-center text-sm font-medium text-gray-500">
                  <Mail className="w-5 h-5 mr-2 text-gray-400" />
                  Correo electrónico
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{email}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="flex items-center text-sm font-medium text-gray-500">
                  <Briefcase className="w-5 h-5 mr-2 text-gray-400" />
                  Rol
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{rol}</dd>
              </div>
            </dl>
          </div>
          <div className="px-4 py-4 bg-gray-50 sm:px-6">
            <div className="flex justify-end space-x-3">
              <button
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition duration-300 bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="w-5 h-5 mr-2" />
                Editar perfil
              </button>
              <button
                onClick={cerrarSesion}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition duration-300 bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="py-8 text-white bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold">EmpresaTransporte</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/terminos" className="hover:text-blue-600">Términos y Condiciones</Link>
              <Link to="/privacidad" className="hover:text-blue-600">Política de Privacidad</Link>
            </div>
          </div>
          <div className="mt-4 text-sm text-center">
            © 2024 EmpresaTransporte. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Perfil;