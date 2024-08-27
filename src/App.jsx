import { Route, Routes } from 'react-router-dom';
import CargarCamion from './pages/CargarCamion';
import DetallesCamion from './pages/DetallesCamion';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin' 
import SolicitarCamion from './pages/SollicitarCamion';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/cargarcamion" element={<CargarCamion />} />
          <Route exact path="/inicio"  element={<Inicio />} />
          <Route path="/detallescamion/:id" element={<DetallesCamion />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/solicitarcamion/:id" element={<SolicitarCamion />} />

        </Routes>
      </div>
  );
}

export default App;
  