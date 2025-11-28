import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ImportarPlanilhas from "./pages/ImportarPlanilhas";
import Apontamentos from "./pages/Apontamentos";
import Entregador from "./pages/Entregador";
import Configuracoes from "./pages/Config";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/importar-planilhas" element={<ImportarPlanilhas />} />
      <Route path="/apontamentos" element={<Apontamentos />} />
      <Route path="/entregador" element={<Entregador />}/>
      <Route path="/configuracoes" element={<Configuracoes />} />
    </Routes>
  );
}
