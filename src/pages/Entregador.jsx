import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Entregador() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [veiculo, setVeiculo] = useState("");

  const [entregadores, setEntregadores] = useState([]);
  const [editId, setEditId] = useState(null);
  const [modalRemoverId, setModalRemoverId] = useState(null);

  const [busca, setBusca] = useState("");
  const [filtroVeiculo, setFiltroVeiculo] = useState("");

  const nomeRegex = /^[A-Za-zÀ-ÿ]{2,}( [A-Za-zÀ-ÿ]{2,})+$/;
  const telefoneRegex = /^\(?\d{2}\)? ?9?\d{4}-?\d{4}$/;

  const generateId = () => Date.now();

  useEffect(() => {
    const data = localStorage.getItem("entregadores");
    if (data) setEntregadores(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("entregadores", JSON.stringify(entregadores));
  }, [entregadores]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nomeRegex.test(nome.trim())) {
      alert("Digite um nome completo válido.");
      return;
    }

    if (!telefoneRegex.test(telefone.trim())) {
      alert("Digite um telefone válido.");
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
      const novo = { id: generateId(), nome, telefone, veiculo };
      setEntregadores((prev) => [...prev, novo]);
    }

    setNome("");
    setTelefone("");
    setVeiculo("");
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

  const abrirModalRemover = (id) => {
    setModalRemoverId(id);
  };

  const confirmarRemocao = () => {
    setEntregadores((prev) =>
      prev.filter((item) => item.id !== modalRemoverId)
    );
    setModalRemoverId(null);
  };

  const cancelarRemocao = () => {
    setModalRemoverId(null);
  };

  const entregadoresFiltrados = entregadores.filter((item) => {
    const texto = (item.nome + item.telefone + item.veiculo).toLowerCase();
    const buscaMatch = texto.includes(busca.toLowerCase());
    const veiculoMatch =
      filtroVeiculo === "" ? true : item.veiculo === filtroVeiculo;
    return buscaMatch && veiculoMatch;
  });

  return (
    <>
      <Navbar title="Entregadores" />

      <style>{`
        .edit-highlight {
          background-color: #fff6b3 !important;
          transition: background-color 0.3s ease-in-out;
        }

        .dark .edit-highlight {
          background-color: rgba(248, 215, 118, 0.45) !important;
        }
      `}</style>

      <div className="pt-20 px-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-3 dark:text-white">
          {editId ? "Editar entregador" : "Cadastrar novo entregador"}
        </h2>

        {/* FORMULÁRIO */}
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
              placeholder="Telefone"
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

        {/* BUSCA / FILTRO */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Buscar entregador..."
            className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white flex-1"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={filtroVeiculo}
            onChange={(e) => setFiltroVeiculo(e.target.value)}
          >
            <option value="">Todos veículos</option>
            <option value="Moto">Moto</option>
            <option value="Bicicleta">Bicicleta</option>
          </select>
        </div>

        <h2 className="text-xl font-bold mb-2 dark:text-white">
          Entregadores cadastrados
        </h2>

        {entregadoresFiltrados.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            Nenhum entregador encontrado.
          </p>
        )}

        {entregadoresFiltrados.length > 0 && (
          <div className="overflow-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
                <tr>
                  <th className="border px-3 py-2">ID</th>
                  <th className="border px-3 py-2">Nome</th>
                  <th className="border px-3 py-2">Telefone</th>
                  <th className="border px-3 py-2">Veículo</th>
                  <th className="border px-3 py-2 text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
                {entregadoresFiltrados.map((item) => (
                  <tr
                    key={item.id}
                    className={`
                      odd:bg-white even:bg-gray-50
                      dark:odd:bg-gray-900 dark:even:bg-gray-800 dark:text-white
                      ${editId === item.id ? "edit-highlight" : ""}
                    `}
                  >
                    <td className="border px-2 py-1">{item.id}</td>
                    <td className="border px-2 py-1">{item.nome}</td>
                    <td className="border px-2 py-1">{item.telefone}</td>
                    <td className="border px-2 py-1">{item.veiculo}</td>

                    {/* AÇÕES COM ÍCONES */}
                    <td className="border px-2 py-1">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => editar(item)}
                          className="p-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white transition"
                          title="Editar"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => abrirModalRemover(item.id)}
                          className="p-2 rounded bg-red-600 hover:bg-red-700 text-white transition"
                          title="Remover"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL DE REMOÇÃO */}
      {modalRemoverId !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={cancelarRemocao}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-xl rounded-lg p-4 w-72 animate-[scale_120ms_ease-out]"
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
        </div>
      )}
    </>
  );
}
