import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Entregador() {

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [veiculo, setVeiculo] = useState("");

  const [entregadores, setEntregadores] = useState([]);

  // Criar ID incremental simples (por enquanto)
  const generateId = () => Date.now();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim()) return alert("Digite o nome do entregador");

    const novo = {
      id: generateId(),
      nome,
      telefone,
      veiculo
    };

    setEntregadores(prev => [...prev, novo]);

    // Limpar formulário
    setNome("");
    setTelefone("");
    setVeiculo("");
  };

  const remover = (id) => {
    if (confirm("Deseja remover este entregador?")) {
      setEntregadores(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <>
      <Navbar title="Entregadores" />

      <div className="pt-20 px-4 max-w-2xl mx-auto">

        {/* Formulário */}
        <h2 className="text-xl font-bold mb-3 dark:text-white">Cadastrar novo entregador</h2>

        <form onSubmit={handleSubmit} className="border rounded p-4 mb-8 bg-white shadow-sm">
          <div className="flex flex-col gap-3">

            <input
              type="text"
              placeholder="Nome completo"
              className="border p-2 rounded"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />

            <input
              type="text"
              placeholder="Telefone"
              className="border p-2 rounded"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
            />

            <input
              type="text"
              placeholder="Veículo (Moto, Bicicleta, etc)"
              className="border p-2 rounded"
              value={veiculo}
              onChange={e => setVeiculo(e.target.value)}
            />

            <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
              Cadastrar
            </button>

          </div>
        </form>

        {/* Listagem */}
        <h2 className="text-xl font-bold mb-2 dark:text-white">Entregadores cadastrados</h2>

        {entregadores.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">Nenhum entregador cadastrado ainda.</p>
        )}

        {entregadores.length > 0 && (
          <div className="overflow-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left font-semibold">ID</th>
                  <th className="border px-3 py-2 text-left font-semibold">Nome</th>
                  <th className="border px-3 py-2 text-left font-semibold">Telefone</th>
                  <th className="border px-3 py-2 text-left font-semibold">Veículo</th>
                  <th className="border px-3 py-2 text-center font-semibold">Ações</th>
                </tr>
              </thead>

              <tbody>
                {entregadores.map(item => (
                  <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                    <td className="border px-2 py-1">{item.id}</td>
                    <td className="border px-2 py-1 font-medium">{item.nome}</td>
                    <td className="border px-2 py-1">{item.telefone}</td>
                    <td className="border px-2 py-1">{item.veiculo}</td>
                    <td className="border text-center px-2 py-1">
                      <button
                        onClick={() => remover(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </>
  );
}
