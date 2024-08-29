import  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const baseUrl = "http://localhost:3100/camiones";

const DashboardCondu = () => {
  const [camiones, setCamiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get('id') || cookies.get('rol') !== 'conductor') {
      navigate("/login");
    } else {
      obtenerCamiones();
    }
  }, [navigate]);

  const obtenerCamiones = async () => {
    try {
      setLoading(true);
      const response = await axios.get(baseUrl);
      setCamiones(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los camiones:", error);
      setError("Hubo un problema al cargar los datos de los camiones.");
      setLoading(false);
    }
  };

  const cerrarSesion = () => {
    ['id', 'nombres', 'email', 'rol'].forEach(cookie => 
      cookies.remove(cookie, { path: "/" })
    );
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 shadow-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <span className="flex items-center flex-shrink-0 text-2xl font-bold text-white">
                Dashboard Conductor
              </span>
            </div>
            <div className="flex items-center">
              <button onClick={cerrarSesion} className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Bienvenido, {cookies.get('nombres')}</h1>
        
        {loading ? (
          <p className="text-center text-gray-600">Cargando datos de camiones...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {camiones.map(camion => (
              <div key={camion.id} className="overflow-hidden bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Camión: {camion.matricula}
                  </h3>
                  <div className="max-w-xl mt-2 text-sm text-gray-500">
                    <p>Marca: {camion.marca}</p>
                    <p>Capacidad: {camion.capacidad}kg</p>
                    <p>Carga Actual: {camion.carga_actual}kg</p>
                  </div>
                  <div className="mt-3">
                    <Link to={`/detallescamion/${camion.id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Seleccionar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCondu;