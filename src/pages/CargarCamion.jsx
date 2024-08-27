import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const baseUrl = "http://localhost:3100/camiones";
const cookies = new Cookies();

class CargarCamion extends Component {
  componentDidMount() {
    if (!cookies.get('id')) {
      window.location.href = "/login";
    }
  }

  state = {
    form: {
      matricula: '',
      marca: '',
      capacidad: '',
      consumo: '',
      carga_actual: ''
    },
  }

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  cargarCamion = async (e) => {
    e.preventDefault();
    const { matricula, marca, capacidad, consumo, carga_actual } = this.state.form;

    try {
      await axios.post(baseUrl, {
        matricula,
        marca,
        capacidad,
        consumo,
        carga_actual
      });
      alert("Camión registrado con éxito");
      window.location.href = "/detallescamion";
    } catch (error) {
      this.setState({ error: "Hubo un problema al registrar el camión. Inténtalo nuevamente." });
    }
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        <nav className="p-4 bg-blue-500 shadow-lg">
          <div className="container flex items-center justify-between mx-auto">
            <Link to="/inicio" className="text-2xl font-bold text-white">EmpresaTransporte</Link>
            <div className="space-x-4">
              <Link to="/inicio" className="px-4 py-2 text-white transition duration-300 rounded hover:bg-blue-700">Inicio</Link>
              <Link to="/perfil" className="px-4 py-2 text-white transition duration-300 rounded hover:bg-blue-700">Perfil</Link>
            </div>
          </div>
        </nav>
        <div className="container items-center justify-center w-full p-6 mx-auto my-8 bg-white rounded-lg shadow-lg md:w-2/5">
          <h2 className="mb-6 text-3xl font-extrabold text-center text-gray-800 bg-white">Cargar Camión</h2>
          {error && <p className="text-center text-red-600">{error}</p>}
          <form onSubmit={this.cargarCamion} className="space-y-6">
            <div>
              <label htmlFor="matricula" className="block text-sm font-medium text-gray-600">Matrícula</label>
              <input
                type="text"
                id="matricula"
                name="matricula"
                className="block w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="marca" className="block text-sm font-medium text-gray-600">Marca</label>
              <input
                type="text"
                id="marca"
                name="marca"
                className="block w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="capacidad" className="block text-sm font-medium text-gray-600">Capacidad (kg)</label>
              <input
                type="text"
                id="capacidad"
                name="capacidad"
                className="block w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="consumo" className="block text-sm font-medium text-gray-600">Consumo Gasolina</label>
              <input
                type="text"
                id="consumo"
                name="consumo"
                className="block w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="carga_actual" className="block text-sm font-medium text-gray-600">Carga actual</label>
              <input
                type="text"
                id="carga_actual"
                name="carga_actual"
                className="block w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={this.handleChange}
              />
            </div>
            <div className="flex mt-6 space-x-4">  
            <button type="submit" className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Cargar camión</button> 
            <Link to ="/detallescamion">
            <button type=" " className="px-4 py-2 text-white transition duration-300 bg-black rounded-lg hover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-black-500">volver</button>
            </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CargarCamion;
