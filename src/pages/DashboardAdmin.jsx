import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const baseUrl = "http://localhost:3100/camiones";

const DashboardAdmin = () => {
  const [camiones, setCamiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get('id') || cookies.get('rol') !== 'administrador') {
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

  const eliminarCamion = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      setCamiones(camiones.filter(camion => camion.id !== id));
      alert("Camión eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el camión:", error);
      setError("Hubo un problema al eliminar el camión.");
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
                Dashboard Administrador
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
        
        <div className="mb-6">
          <Link to="/cargarcamion" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Agregar Nuevo Camión
          </Link>
        </div>
        
        {loading ? (
          <p className="text-center text-gray-600">Cargando datos de camiones...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Matrícula</th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Marca</th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Capacidad</th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Carga Actual</th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {camiones.map(camion => (
                  <tr key={camion.id}>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{camion.matricula}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{camion.marca}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{camion.capacidad}kg</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{camion.carga_actual}kg</td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <Link to={`/editarcamion/${camion.id}`} className="mr-4 text-indigo-600 hover:text-indigo-900">Editar</Link>
                      <button onClick={() => eliminarCamion(camion.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
