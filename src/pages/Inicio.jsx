import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react';

const baseUrl = 'http://localhost:3100/camiones';

const Inicio = () => {
  const [camiones, setCamiones] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargaRequerida, setCargaRequerida] = useState('');
  const [mejorCamion, setMejorCamion] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerCamiones();
  }, []);

  const obtenerCamiones = async () => {
    try {
      const response = await axios.get(baseUrl);
      setCamiones(response.data);
    } catch (error) {
      console.error('Error al obtener los camiones:', error);
      setError('Error al obtener los camiones. Por favor, intente de nuevo más tarde.');
    }
  };

  const filtrarCamiones = camiones.filter(camion =>
    camion.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
    camion.matricula.toLowerCase().includes(busqueda.toLowerCase())
  );

  const determinarMejorCamion = () => {
    const carga = parseFloat(cargaRequerida);
    if (isNaN(carga) || carga <= 0) {
      setError('Por favor, ingrese una carga válida.');
      setMejorCamion(null);
      return;
    }

    const camionesDisponibles = camiones.filter(camion => camion.capacidad >= carga);
    if (camionesDisponibles.length === 0) {
      setError('No hay camiones disponibles con la capacidad suficiente.');
      setMejorCamion(null);
      return;
    }

    const mejorCamion = camionesDisponibles.reduce((prev, current) => 
      (prev.consumo < current.consumo) ? prev : current
    );

    setMejorCamion(mejorCamion);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">Gestión de Camiones</h1>
        
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Ingrese la carga requerida (kg)"
              value={cargaRequerida}
              onChange={(e) => setCargaRequerida(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={determinarMejorCamion}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Determinar Mejor Camión
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 mb-8 text-red-700 bg-red-100 border-l-4 border-red-500" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {mejorCamion && (
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Mejor Camión Disponible</h2>
            <p><strong>Matrícula:</strong> {mejorCamion.matricula}</p>
            <p><strong>Marca:</strong> {mejorCamion.marca}</p>
            <p><strong>Capacidad:</strong> {mejorCamion.capacidad} kg</p>
            <p><strong>Consumo:</strong> {mejorCamion.consumo} L/100km</p>
          </div>
        )}

        <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtrarCamiones.map(camion => (
            <div key={camion.id} className="overflow-hidden transition duration-300 ease-in-out transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
              <img src="/src/img/mula.jpg" alt="Camión" className="object-cover object-center w-full h-56" />
              <div className="p-6">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">Matrícula: {camion.matricula}</h2>
                <p className="text-gray-700"><span className="font-semibold">Marca:</span> {camion.marca}</p>
                <p className="text-gray-700"><span className="font-semibold">Capacidad:</span> {camion.capacidad} kg</p>
                <p className="text-gray-700"><span className="font-semibold">Consumo:</span> {camion.consumo} L/100km</p>
                <p className="text-gray-700"><span className="font-semibold">Carga Actual:</span> {camion.carga_actual} kg</p>
                <div className="mt-6">
                  <Link 
                    to={`/solicitarcamion/${camion.id}`} 
                    className="inline-block w-full px-4 py-2 text-base font-medium text-center text-white transition duration-300 bg-blue-700 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Solicitar
                  </Link>
                </div>
              </div>
            </div>
          ))}
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

export default Inicio;