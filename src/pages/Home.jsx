import { Link } from 'react-router-dom';
import { Map, Truck, Shield, Clock, Phone } from 'lucide-react';

const Home = () => {
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
      <header className="text-white bg-blue-600">
        <div className="px-4 py-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Transporte de Carga Seguro y Confiable
          </h1>
          <p className="mt-4 text-xl">
            Llevamos tu carga a su destino con seguridad y puntualidad
          </p>
        </div>
      </header>
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-12 text-3xl font-extrabold text-center text-gray-900">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Map  className="w-12 h-12 text-blue-600" />}
              title="Transporte Nacional"
              description="Cubrimos todas las rutas nacionales con eficiencia y seguridad."
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-blue-600" />}
              title="Carga Segura"
              description="Garantizamos la seguridad de tu carga en todo momento."
            />
            <FeatureCard
              icon={<Clock className="w-12 h-12 text-blue-600" />}
              title="Entregas Puntuales"
              description="Nos comprometemos con los tiempos de entrega acordados."
            />
            <FeatureCard
              icon={<Phone className="w-12 h-12 text-blue-600" />}
              title="Atención 24/7"
              description="Estamos disponibles para atenderte en cualquier momento."
            />
          </div>
        </div>
      </section>
      <section className="py-16 text-white bg-blue-600">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-extrabold">
            ¿Listo para transportar tu carga?
          </h2>
          <p className="mb-8 text-xl">
            Contáctanos hoy mismo y obtén una cotización personalizada.
          </p>
          <Link to="/contacto" className="inline-block px-6 py-3 text-lg font-bold text-blue-700 transition duration-300 bg-white rounded-lg hover:bg-blue-50">
            Contáctanos
          </Link>
        </div>
      </section>
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

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 text-center transition duration-300 rounded-lg shadow-md bg-gray-50 hover:shadow-lg">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;