import { Toaster } from 'sonner';
import DashboardRecepcion from "./pages/dashboardRecepcion"
import FormularioPaciente from "./components/pacientes/FormularioPaciente"

function App() {

  return (
    <>
      <Toaster position="top-right" richColors/>
      <DashboardRecepcion></DashboardRecepcion>
    </>
  )
}

export default App
