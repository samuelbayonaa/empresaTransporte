import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {Truck} from 'lucide-react'

const cookies = new Cookies();
const baseUrl = "http://localhost:3100/camiones";

const DetallesCamion = () => {
  const [camion, setCamion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get('id')) {
      navigate("/login");
    } else {
      obtenerCamion();
    }
  }, [id, navigate]);

  const obtenerCamion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/${id}`);
      setCamion(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los detalles del camión:", error);
      setError("Hubo un problema al cargar los datos del camión.");
      setLoading(false);
    }
  };

  return (
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

      <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Detalles del Camión</h1>
          
          {loading ? (
            <p className="text-center text-gray-600">Cargando detalles del camión...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : camion ? (
            <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                  Matrícula: {camion.matricula}
                </h3>
                <p className="mt-1 text-sm text-gray-500">Marca: {camion.marca}</p>
                <p className="mt-1 text-sm text-gray-500">Capacidad: {camion.capacidad}kg</p>
                <p className="mt-1 text-sm text-gray-500">Consumo: {camion.consumo}L/100km</p>
                <p className="mt-1 text-sm text-gray-500">Carga Actual: {camion.carga_actual}kg</p>
                <div className="flex justify-between mt-4">
                  <Link to="/dashboard-conductor">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      Volver al Inicio
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">No se encontró el camión.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallesCamion;