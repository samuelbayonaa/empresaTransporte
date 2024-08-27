import  { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:3100/camiones";

const Inicio = () => {
  const [camiones, setCamiones] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    obtenerCamiones();
  }, []);

  const obtenerCamiones = async () => {
    try {
      const response = await axios.get(baseUrl);
      setCamiones(response.data);
    } catch (error) {
      console.error("Error al obtener los camiones:", error);
    }
  };

  const filtrarCamiones = camiones.filter(camion =>
    camion.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
    camion.matricula.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 shadow-lg">
        <div className="container flex items-center justify-between px-6 py-3 mx-auto">
          <Link to="/inicio" className="text-2xl font-bold text-white">EmpresaTransporte</Link>
          <div className="space-x-4">
            <Link to="/inicio" className="text-white transition duration-300 hover:text-blue-200">Inicio</Link>
            <Link to="/perfil" className="text-white transition duration-300 hover:text-blue-200">Perfil</Link>
          </div>
        </div>
      </nav>
      <div className="container px-6 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">Gestión de Camiones</h1>
        <input
          type="search"
          placeholder="Buscar camión por marca o matrícula"
          className="block w-full max-w-md p-3 mx-auto mb-8 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtrarCamiones.map(camion => (
            <div key={camion.id} className="overflow-hidden transition duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
              <img src="/src/img/mula.jpg" alt="Camión" className="object-cover w-full h-48" />
              <div className="p-6">
                <h2 className="mb-2 text-xl font-bold">Matrícula: {camion.matricula}</h2>
                <p><strong>Marca:</strong> {camion.marca}</p>
                <p><strong>Capacidad:</strong> {camion.capacidad} kg</p>
                <p><strong>Consumo:</strong> {camion.consumo} L/100km</p>
                <p><strong>Carga Actual:</strong> {camion.carga_actual} kg</p>
                <Link to={`/solicitarcamion/${camion.id}`} className="inline-block px-4 py-2 mt-4 text-white transition duration-300 bg-blue-600 rounded hover:bg-blue-700">
                  Solicitar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;