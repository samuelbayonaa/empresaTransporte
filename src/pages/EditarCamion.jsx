import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const baseUrl = "http://localhost:3100/camiones";

const EditarCamion = () => {
  const [camion, setCamion] = useState({
    matricula: "",
    marca: "",
    capacidad: "",
    consumo: "",
    carga_actual: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get('id') || cookies.get('rol') !== 'administrador') {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCamion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/${id}`, camion);
      alert("Camión actualizado con éxito");
      navigate("/dashboard-admin");
    } catch (error) {
      console.error("Error al actualizar el camión:", error);
      setError("Hubo un problema al actualizar el camión.");
    }
  };

  if (loading) return <p className="mt-8 text-center">Cargando datos del camión...</p>;
  if (error) return <p className="mt-8 text-center text-red-600">{error}</p>;

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Editar Camión</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    id="matricula"
                    name="matricula"
                    type="text"
                    className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                    placeholder="Matrícula"
                    value={camion.matricula}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="matricula" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Matrícula</label>
                </div>
                <div className="relative">
                  <input
                    id="marca"
                    name="marca"
                    type="text"
                    className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                    placeholder="Marca"
                    value={camion.marca}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="marca" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Marca</label>
                </div>
                <div className="relative">
                  <input
                    id="capacidad"
                    name="capacidad"
                    type="number"
                    className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                    placeholder="Capacidad"
                    value={camion.capacidad}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="capacidad" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Capacidad (kg)</label>
                </div>
                <div className="relative">
                  <input
                    id="consumo"
                    name="consumo"
                    type="number"
                    step="0.1"
                    className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                    placeholder="Consumo"
                    value={camion.consumo}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="consumo" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consumo (L/100km)</label>
                </div>
                <div className="relative">
                  <input
                    id="carga_actual"
                    name="carga_actual"
                    type="number"
                    className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
                    placeholder="Carga Actual"
                    value={camion.carga_actual}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="carga_actual" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Carga Actual (kg)</label>
                </div>
                <div className="relative">
                  <button className="px-2 py-1 text-white bg-blue-500 rounded-md">Actualizar Camión</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCamion;