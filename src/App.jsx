import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import DashboardRecepcion from "./pages/dashboardRecepcion";
import FormularioPaciente from "./components/pacientes/FormularioPaciente";
import LayoutPrincipal from './components/layout/LayoutPrincipal';
import DetalleTurno from './components/turnos/DetalleTurno';
import NotFound from './components/utils/NotFound';
import Login from "./pages/Login";
import RutaProtegida from "./components/auth/RutaProtegida";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" replace />} />

        <Route element={<RutaProtegida />}>
          <Route element={<LayoutPrincipal />}>
            <Route path="/dashboard" element={<DashboardRecepcion />} />
            <Route path="/nuevo-paciente" element={<FormularioPaciente />} />
            <Route path="/turno-detalle/:id" element={<DetalleTurno />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;