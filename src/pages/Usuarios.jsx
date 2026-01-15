import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Usuarios() {
  const userRole = localStorage.getItem("userRole") || "operador";

  const podeEditar = ["admin", "operador_senior"].includes(userRole);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [nivel, setNivel] = useState("");
  const [pix, setPix] = useState("");
  const [documento, setDocumento] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  const [usuarios, setUsuarios] = useState([]);
  const [editId, setEditId] = useState(null);
  const [modalRemoverId, setModalRemoverId] = useState(null);

  const [busca, setBusca] = useState("");

  const nomeRegex = /^[A-Za-zÀ-ÿ]{2,}( [A-Za-zÀ-ÿ]{2,})+$/;
  const telefoneRegex = /^\(?\d{2}\)? ?9?\d{4}-?\d{4}$/;
  const cpfRegex = /^\d{11}$/;
  const cepRegex = /^\d{8}$/;

  const generateId = () => Date.now();

  useEffect(() => {
    const data = localStorage.getItem("usuarios");
    if (data) setUsuarios(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  const handleDocumento = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewDoc(reader.result);
      setDocumento(reader.result);
    };
    reader.readAsDataURL(file);
  };

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

    if (!cpfRegex.test(cpf)) {
      alert("CPF deve conter 11 números.");
      return;
    }

    if (!cepRegex.test(cep)) {
      alert("CEP deve conter 8 números.");
      return;
    }

    if (!nivel) {
      alert("Selecione o nível de acesso.");
      return;
    }

    if (nivel === "entregador") {
      if (!pix) {
        alert("PIX é obrigatório para entregador.");
        return;
      }
      if (!documento) {
        alert("Documento (CNH) é obrigatório para entregador.");
        return;
      }
    }

    const payload = {
      id: editId ?? generateId(),
      nome,
      telefone,
      cpf,
      cep,
      nivel,
      pix: nivel === "entregador" ? pix : "",
      documento: nivel === "entregador" ? documento : null,
    };

    if (editId) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === editId ? payload : u))
      );
      setEditId(null);
    } else {
      setUsuarios((prev) => [...prev, payload]);
    }

    limparFormulario();
  };

  const limparFormulario = () => {
    setNome("");
    setTelefone("");
    setCpf("");
    setCep("");
    setNivel("");
    setPix("");
    setDocumento(null);
    setPreviewDoc(null);
    setEditId(null);
  };

  const editar = (item) => {
    if (!podeEditar) return;

    setEditId(item.id);
    setNome(item.nome);
    setTelefone(item.telefone);
    setCpf(item.cpf);
    setCep(item.cep);
    setNivel(item.nivel);
    setPix(item.pix || "");
    setDocumento(item.documento);
    setPreviewDoc(item.documento);
  };

  const confirmarRemocao = () => {
    setUsuarios((prev) =>
      prev.filter((item) => item.id !== modalRemoverId)
    );
    setModalRemoverId(null);
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    (u.nome + u.telefone + u.cpf + u.nivel)
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <>
      <Navbar title="Usuários" />

      <style>{`
        .edit-highlight {
          background-color: #fff6b3 !important;
        }
        .dark .edit-highlight {
          background-color: rgba(248, 215, 118, 0.45) !important;
        }
      `}</style>

      <div className="pt-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-3 dark:text-white">
          {editId ? "Editar usuário" : "Cadastrar usuário"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="border rounded p-4 mb-8 bg-white shadow-sm dark:bg-gray-900 dark:text-white"
        >
          <div className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="Nome completo"
              className="border p-2 rounded dark:bg-gray-800"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              placeholder="Telefone"
              className="border p-2 rounded dark:bg-gray-800"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            <input
              placeholder="CPF (somente números)"
              className="border p-2 rounded dark:bg-gray-800"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />

            <input
              placeholder="CEP (somente números)"
              className="border p-2 rounded dark:bg-gray-800"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />

            <select
              className="border p-2 rounded dark:bg-gray-800"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
            >
              <option value="">Nível de acesso</option>
              <option value="admin">Admin</option>
              <option value="operador_senior">Operador Sênior</option>
              <option value="operador">Operador</option>
              <option value="entregador">Entregador</option>
            </select>

            {nivel === "entregador" && (
              <>
                <input
                  placeholder="Chave PIX"
                  className="border p-2 rounded dark:bg-gray-800"
                  value={pix}
                  onChange={(e) => setPix(e.target.value)}
                />

                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleDocumento(e.target.files[0])}
                  className="border p-2 rounded dark:bg-gray-800"
                />

                {previewDoc && (
                  <img
                    src={previewDoc}
                    alt="CNH"
                    className="col-span-2 max-h-60 object-contain border rounded bg-gray-100 dark:bg-gray-800"
                  />
                )}
              </>
            )}
          </div>

          {podeEditar && (
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {editId ? "Salvar edição" : "Cadastrar"}
            </button>
          )}
        </form>

        <input
          placeholder="Buscar usuário..."
          className="border p-2 rounded w-full mb-4 dark:bg-gray-800 dark:text-white"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <div className="overflow-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
              <tr>
                <th className="border px-2 py-1">Nome</th>
                <th className="border px-2 py-1">CPF</th>
                <th className="border px-2 py-1">Nível</th>
                <th className="border px-2 py-1 text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
              {usuariosFiltrados.map((u) => (
                <tr
                  key={u.id}
                  className={`${editId === u.id ? "edit-highlight" : ""} 
                  odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 dark:text-white`}
                >
                  <td className="border px-2 py-1">{u.nome}</td>
                  <td className="border px-2 py-1">{u.cpf}</td>
                  <td className="border px-2 py-1">{u.nivel}</td>
                  <td className="border px-2 py-1">
                    <div className="flex justify-center gap-2">
                      {podeEditar && (
                        <>
                          <button
                            onClick={() => editar(u)}
                            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => setModalRemoverId(u.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalRemoverId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
            <p className="mb-4 dark:text-white">
              Confirmar remoção?
            </p>
            <div className="flex justify-end gap-3">
              <button className="px-3 py-1 rounded text-gray-400" onClick={() => setModalRemoverId(null)}>Cancelar</button>
              <button
                onClick={confirmarRemocao}
                className="bg-red-600 text-white px-3 py-1 rounded"
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
