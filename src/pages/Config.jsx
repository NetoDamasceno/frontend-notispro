import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import LogoutModal from "../components/LogoutModal";

export default function Configuracoes() {
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [mostrarModalSair, setMostrarModalSair] = useState(false);

  // ✅ Ao abrir a tela, lê tema salvo
  useEffect(() => {
    const temaSalvo = localStorage.getItem("theme");
    if (temaSalvo === "dark") {
      setTemaEscuro(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // ✅ Alternar tema
  const toggleTema = () => {
    const novoTema = !temaEscuro;
    setTemaEscuro(novoTema);

    if (novoTema) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <Navbar title="Configurações" />

      <div
        className="min-h-screen pt-20 px-6 max-w-3xl mx-auto 
        bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors"
      >
        <h2 className="text-xl font-bold mb-4">Preferências do Sistema</h2>

        <div className="border rounded p-4 bg-white dark:bg-gray-800 shadow-sm mb-6">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-lg font-medium">Tema escuro</span>
            <input
              type="checkbox"
              className="ml-4 scale-125 cursor-pointer"
              checked={temaEscuro}
              onChange={toggleTema}
            />
          </label>
        </div>

        <h2 className="text-xl font-bold mb-4">Conta do Usuário</h2>

        <div className="border rounded p-4 bg-white dark:bg-gray-800 shadow-sm">
          <p className="text-gray-700 dark:text-gray-300">
            Nome: <strong>Usuário Teste</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Email: <strong>usuario@email.com</strong>
          </p>

          <button
            onClick={() => setMostrarModalSair(true)}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Sair da Conta
          </button>
        </div>
      </div>

      {/* 🟣 MODAL REUTILIZÁVEL */}
      <LogoutModal
        open={mostrarModalSair}
        onClose={() => setMostrarModalSair(false)}
      />
    </>
  );
}
