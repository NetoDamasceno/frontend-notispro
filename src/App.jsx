import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ImportarPlanilhas from "./pages/ImportarPlanilhas";
import Apontamentos from "./pages/Apontamentos";
import Usuarios from "./pages/Usuarios";
import Configuracoes from "./pages/Config";
import Relatorios from "./pages/Relatorios";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/importar-planilhas" element={<ImportarPlanilhas />} />
      <Route path="/apontamentos" element={<Apontamentos />} />
      <Route path="/usuarios" element={<Usuarios />}/>
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/relatorios" element={<Relatorios />} />
    </Routes>
  );
}
