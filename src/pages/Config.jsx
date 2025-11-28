import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Configuracoes() {
  const [temaEscuro, setTemaEscuro] = useState(false);

  return (
    <>
      <Navbar title="Configurações" />

      <div className="pt-20 px-6 max-w-3xl mx-auto">

        <h2 className="text-xl font-bold mb-4">Preferências do Sistema</h2>

        <div className="border rounded p-4 bg-white shadow-sm mb-6">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-lg font-medium">Tema escuro</span>
            <input 
              type="checkbox" 
              className="ml-4 scale-125 cursor-pointer"
              checked={temaEscuro}
              onChange={() => setTemaEscuro(!temaEscuro)}
            />
          </label>
        </div>

        <h2 className="text-xl font-bold mb-4">Conta do Usuário</h2>

        <div className="border rounded p-4 bg-white shadow-sm">
          <p className="text-gray-700">Nome: <strong>Usuário Teste</strong></p>
          <p className="text-gray-700">Email: <strong>usuario@email.com</strong></p>

          <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Sair da Conta
          </button>
        </div>

      </div>
    </>
  );
}
