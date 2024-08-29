import { Route, Routes } from 'react-router-dom';
import CargarCamion from './pages/CargarCamion';
import DetallesCamion from './pages/DetallesCamion';
import Home from "./pages/Home"
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin' 
import DashboardCondu from './pages/DashboardCondu';
import SolicitarCamion from './pages/SolicitarCamion';
import EditarCamion from "./pages/EditarCamion"
import SubirCarga from "./pages/SubirCarga"

function App() {
  return (
    <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/cargarcamion" element={<CargarCamion />} />
          <Route path="/editarcamion/:id" element={<EditarCamion />} />
          <Route exact path="/inicio"  element={<Inicio />} />
          <Route path="/detallescamion/:id" element={<DetallesCamion />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/dashboard-conductor" element={<DashboardCondu />} />
          <Route path="/solicitarcamion/:id" element={<SolicitarCamion />} />
          <Route path="/subircarga/:id" element={<SubirCarga />} />


        </Routes>
      </div>
  );
}

export default App;
  