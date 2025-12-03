import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  FileBarChart,
  ClipboardList,
  FileClock,
  Users,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser || "Usuário");
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar title="Dashboard" userName={username} />

      <main className="p-6 pt-20 space-y-6 overflow-y-auto max-h-[calc(100vh-64px)]">
        {/* TÍTULO */}
        <div>
          <h1 className="text-2xl font-semibold">Olá, {username}</h1>
          <p className="text-gray-600 mt-1">
            Aqui está o resumo das atividades recentes do cartório.
          </p>
        </div>

        {/* CARDS RESUMO */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 hover:scale-[1.02] transition">
            <ClipboardList className="text-blue-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Apontamentos</h2>
              <p className="text-gray-600 text-sm">Últimos 30 dias</p>
              <span className="text-xl font-bold text-blue-700">142</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 hover:scale-[1.02] transition">
            <FileClock className="text-yellow-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Pendentes</h2>
              <p className="text-gray-600 text-sm">Aguardando entrega</p>
              <span className="text-xl font-bold text-yellow-700">18</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 hover:scale-[1.02] transition">
            <Users className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Entregadores ativos</h2>
              <p className="text-gray-600 text-sm">Registrados</p>
              <span className="text-xl font-bold text-green-700">4</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 hover:scale-[1.02] transition">
            <TrendingUp className="text-purple-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Performance</h2>
              <p className="text-gray-600 text-sm">Taxa de entrega</p>
              <span className="text-xl font-bold text-purple-700">96%</span>
            </div>
          </div>
        </section>

        {/* GRÁFICO FAKE (placeholder estilizado) */}
        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FileBarChart size={20} className="text-gray-700" />
            Volume de Apontamentos (Últimos 6 meses)
          </h2>

          {/* Placeholder gráfico */}
          <div className="w-full h-48 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-lg"></div>

          <p className="text-xs text-gray-500 mt-2">
            * Gráfico demonstrativo — os dados reais serão carregados quando a
            API estiver conectada.
          </p>
        </section>
      </main>
    </div>
  );
}
