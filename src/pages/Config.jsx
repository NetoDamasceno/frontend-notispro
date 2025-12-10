import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🟢 IMPORTANTE

export default function Configuracoes() {
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [mostrarModalSair, setMostrarModalSair] = useState(false);
  const navigate = useNavigate(); // 🟢 para redirecionar

  // ✅ Ao abrir a tela, lê tema salvo
  useEffect(() => {
    const temaSalvo = localStorage.getItem("theme");
    if (temaSalvo === "dark") {
      setTemaEscuro(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // ✅ Sempre que alternar o tema
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

  // 🟢 FUNÇÃO DE SAIR DA CONTA
  const sairDaConta = () => {
    localStorage.removeItem("username");
    navigate("/");
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

          {/* 🟥 BOTÃO SAIR FUNCIONAL */}
          <button
            onClick={() => setMostrarModalSair(true)}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Sair da Conta
          </button>
        </div>
      </div>

      {/* 🟣 MODAL DE CONFIRMAÇÃO */}
      {mostrarModalSair && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-80 text-center animate-scaleIn">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Deseja realmente sair?
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Você precisará fazer login novamente depois.
            </p>

            <div className="mt-6 flex gap-3 justify-center">
              <button
                onClick={() => setMostrarModalSair(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-white 
                hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Cancelar
              </button>

              <button
                onClick={sairDaConta}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
