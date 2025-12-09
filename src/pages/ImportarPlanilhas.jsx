import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function ImportarPlanilhas() {
  const [planilhas, setPlanilhas] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:8000/planilha";

  // --------- Funções ---------

  const carregarPlanilhas = async () => {
    try {
      const response = await fetch(`${API_URL}/listar`);
      const data = await response.json();
      setPlanilhas(Array.isArray(data) ? data : data.planilhas || []);
    } catch (err) {
      console.error(err);
      setPlanilhas([]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Selecione um arquivo antes de enviar.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        alert(`Erro: ${result.detail || result.message}`);
        return;
      }

      alert(result.mensagem || "Planilha enviada com sucesso!");
      setSelectedFile(null);
      carregarPlanilhas();
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const inativar = async (nomePlanilha) => {
    if (!window.confirm(`Deseja inativar "${nomePlanilha}"?`)) return;

    setPlanilhas((prev) => prev.filter((p) => p.planilha !== nomePlanilha));
    alert(`Planilha "${nomePlanilha}" inativada.`);

    // futura integração com backend aqui
  };

  // --------- Carregar dados ao abrir ---------
  useEffect(() => {
    carregarPlanilhas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar title="Importar Planilhas" />

      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-3 text-black dark:text-white">
            Enviar nova planilha
          </h2>

          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="border p-2 rounded-md w-full bg-white dark:bg-gray-700 
                   text-black dark:text-white border-gray-300 dark:border-gray-600"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-3 w-full py-2 rounded-lg font-medium transition ${
              loading
                ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
            Planilhas Ativas
          </h2>

          {planilhas.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300 text-center py-4">
              Nenhuma planilha encontrada.
            </p>
          ) : (
            <table className="w-full text-sm border-collapse text-black dark:text-white">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="text-left py-2">Arquivo</th>
                  <th className="text-center">Qtd</th>
                  <th className="text-center w-28">Ação</th>
                </tr>
              </thead>

              <tbody>
                {planilhas.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-300 dark:border-gray-700 
                           hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-2">{p.planilha}</td>
                    <td className="text-center font-medium">
                      {String(p.quantidade || 0).padStart(2, "0")}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => inativar(p.planilha)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        Inativar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
