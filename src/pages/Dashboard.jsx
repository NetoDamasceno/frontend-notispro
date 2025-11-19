import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser || "Usuário");
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* NAVBAR */}
      <header className="h-16 flex items-center px-4 shadow-md bg-white relative z-30">
        <button onClick={() => setIsMenuOpen(true)}>
          <Menu size={28} />
        </button>
        <h3 className="ml-4 text-xl font-semibold">Dashboard</h3>
      </header>

      {/* CONTEÚDO */}
      <main className="p-6 relative z-10 transition-all duration-300">
        <h1 className="text-2xl font-semibold">Olá, {username}</h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo ao sistema de apontamentos.
        </p>
      </main>

      {/* MENU COM EFEITO VIDRO */}
      <div
        className={`fixed top-0 left-0 w-full backdrop-blur-md bg-white/30 shadow-lg p-6 z-40 rounded-b-xl transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Header do menu */}
        <div className="flex justify-between items-center border-b border-white/40 pb-3 mb-4">
          <h2 className="text-lg font-semibold drop-shadow">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-4">
          <button className="text-left font-medium hover:underline">Lançar Horas</button>
          <button className="text-left font-medium hover:underline">Projetos</button>
          <button className="text-left font-medium hover:underline">Relatórios</button>
          <button className="text-left font-medium hover:underline">Configurações</button>
        </nav>
      </div>
    </div>
  );
}
