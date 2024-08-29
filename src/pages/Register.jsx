import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Truck } from 'lucide-react';


const baseUrl = "http://localhost:3100/usuarios";

const Register = () => {
  const [form, setForm] = useState({
    nombres: '',
    email: '',
    numero: '',
    password: '',
    confirmarPassword: '',
    rol: 'cliente',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registro = async (e) => {
    e.preventDefault();
    setError(null);

    const { nombres, email, numero, password, confirmarPassword, rol } = form;

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!nombres || !email || !numero || !password || !rol) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await axios.post(baseUrl, {
        nombres,
        email,
        numero,
        password,
        rol,
      });
      alert("Se ha registrado en el sistema");
      navigate("/login");
    } catch (error) {
      setError("Hubo un problema al registrarse. Inténtalo nuevamente.");
    }
  };

  return (
    <div>
      <nav className="bg-blue-600 shadow-lg">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Truck className="w-12 h-12 text-white" />
                <span className="ml-3 text-2xl font-bold text-white">EmpresaTransporte</span>
              </div>
              <div className="hidden md:block">
              </div>
            </div>
          </div>
        </nav>
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Registrarse
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
          <form className="space-y-6" onSubmit={registro}>
            {['nombres', 'email', 'numero', 'password', 'confirmarPassword'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="mt-1">
                  <input
                    id={field}
                    name={field}
                    type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                    autoComplete={field}
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}

            <div>
              <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                Tipo de usuario
              </label>
              <select
                id="rol"
                name="rol"
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleChange}
                value={form.rol}
              >
                <option value="cliente">Cliente</option>
                <option value="administrador">Administrador de camiones</option>
                <option value="conductor">Conductor</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terminos"
                  name="terminos"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terminos" className="block ml-2 text-sm text-gray-900">
                  Acepto los <a href="#" className="text-blue-600 hover:text-blue-500">términos</a>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Registrarse
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  ¿Ya tienes una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Register;