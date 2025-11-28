import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ title = "Página", userName = "Usuário" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* HEADER FIXO */}
      <header className="h-16 flex items-center justify-between px-6 shadow-md bg-white fixed top-0 left-0 w-full z-50">
        {/* LADO ESQUERDO - BOTÃO MENU + TÍTULO */}
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`transition-all duration-300 p-2 rounded-full hover:scale-110 active:scale-95 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <h3 className="ml-4 text-xl font-semibold">{title}</h3>
        </div>

        {/* LADO DIREITO - PERFIL */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
          <User size={22} />
          <span className="font-medium text-sm">{userName}</span>
        </div>
      </header>

      {/* OVERLAY */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30"
        ></div>
      )}

      {/* MENU DROPDOWN */}
      <div
        className={`fixed left-0 w-full backdrop-blur-md bg-white/30 shadow-lg p-6 z-40 rounded-b-xl transition-transform duration-300 ${
          isMenuOpen ? "translate-y-16" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col gap-4 text-lg font-medium">
          <button
            onClick={() => goTo("/importar-planilhas")}
            className="text-left hover:underline"
          >
            Importar Planilhas
          </button>
          <button
            onClick={() => goTo("/apontamentos")}
            className="text-left hover:underline"
          >
            Apontamentos
          </button>
          <button
            onClick={() => goTo("/entregador")}
            className="text-left hover:underline"
          >
            Entregador
          </button>
          <button
            onClick={() => goTo("/configuracoes")}
            className="text-left hover:underline"
          >
            Configurações
          </button>
        </nav>
      </div>
    </>
  );
}
