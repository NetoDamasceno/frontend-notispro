import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Entregador() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [veiculo, setVeiculo] = useState("");

  const [entregadores, setEntregadores] = useState([]);

  const [editId, setEditId] = useState(null);

  // 🔥 Modal de remoção moderno
  const [modalRemoverId, setModalRemoverId] = useState(null);

  // --- REGEX PROFISSIONAIS ---
  const nomeRegex = /^[A-Za-zÀ-ÿ]{2,}( [A-Za-zÀ-ÿ]{2,})+$/;
  const telefoneRegex = /^\(?\d{2}\)? ?9?\d{4}-?\d{4}$/;

  const generateId = () => Date.now();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nomeRegex.test(nome.trim())) {
      alert("Digite um nome completo válido (Nome e Sobrenome, sem números).");
      return;
    }

    if (!telefoneRegex.test(telefone.trim())) {
      alert("Digite um telefone válido. Ex: (11) 98765-4321");
      return;
    }

    if (!veiculo) {
      alert("Selecione um veículo.");
      return;
    }

    if (editId) {
      setEntregadores((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, nome, telefone, veiculo } : item
        )
      );
      setEditId(null);
    } else {
      const novo = {
        id: generateId(),
        nome,
        telefone,
        veiculo,
      };

      setEntregadores((prev) => [...prev, novo]);
    }

    setNome("");
    setTelefone("");
    setVeiculo("");
  };

  // 🔥 ABRIR modal de remoção
  const abrirModalRemover = (id) => {
    setModalRemoverId(id);
  };

  // 🔥 CONFIRMAR remoção
  const confirmarRemocao = () => {
    setEntregadores((prev) =>
      prev.filter((item) => item.id !== modalRemoverId)
    );
    setModalRemoverId(null);
  };

  // 🔥 CANCELAR remoção
  const cancelarRemocao = () => {
    setModalRemoverId(null);
  };

  const editar = (item) => {
    setEditId(item.id);
    setNome(item.nome);
    setTelefone(item.telefone);
    setVeiculo(item.veiculo);
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setNome("");
    setTelefone("");
    setVeiculo("");
  };

  return (
    <>
      <Navbar title="Entregadores" />

      <div className="pt-20 px-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-3 dark:text-white">
          {editId ? "Editar entregador" : "Cadastrar novo entregador"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="border rounded p-4 mb-8 bg-white shadow-sm dark:bg-gray-900 dark:text-white"
        >
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nome completo"
              className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="text"
              placeholder="Telefone (ex: 11 98765-4321)"
              className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            <select
              className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
              value={veiculo}
              onChange={(e) => setVeiculo(e.target.value)}
            >
              <option value="">Selecione o veículo</option>
              <option value="Moto">Moto</option>
              <option value="Bicicleta">Bicicleta</option>
            </select>

            {editId ? (
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition flex-1"
                >
                  Salvar edição
                </button>

                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition flex-1"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Cadastrar
              </button>
            )}
          </div>
        </form>

        <h2 className="text-xl font-bold mb-2 dark:text-white">
          Entregadores cadastrados
        </h2>

        {entregadores.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum entregador cadastrado ainda.
          </p>
        )}

        {entregadores.length > 0 && (
          <div className="overflow-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
                <tr>
                  <th className="border px-3 py-2 text-left font-semibold">
                    ID
                  </th>
                  <th className="border px-3 py-2 text-left font-semibold">
                    Nome
                  </th>
                  <th className="border px-3 py-2 text-left font-semibold">
                    Telefone
                  </th>
                  <th className="border px-3 py-2 text-left font-semibold">
                    Veículo
                  </th>
                  <th className="border px-3 py-2 text-center font-semibold">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {entregadores.map((item) => (
                  <tr
                    key={item.id}
                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 dark:text-white"
                  >
                    <td className="border px-2 py-1">{item.id}</td>
                    <td className="border px-2 py-1 font-medium">
                      {item.nome}
                    </td>
                    <td className="border px-2 py-1">{item.telefone}</td>
                    <td className="border px-2 py-1">{item.veiculo}</td>
                    <td className="border text-center px-2 py-1 space-x-2">
                      <button
                        onClick={() => editar(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => abrirModalRemover(item.id)}
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

      {/* 🔥 MODAL DE REMOVER */}
      {modalRemoverId !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={cancelarRemocao}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-xl rounded-lg p-4 w-72 animate-[scale_120ms_ease-out]"
            style={{ animationName: "modalScale" }}
          >
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Remover entregador?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Esta ação não pode ser desfeita.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelarRemocao}
                className="px-3 py-1 rounded border border-gray-400 dark:border-gray-600 dark:text-white"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarRemocao}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Remover
              </button>
            </div>
          </div>

          {/* 🔥 animação inline */}
          <style>{`
            @keyframes modalScale {
              0% { transform: scale(0.98); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
