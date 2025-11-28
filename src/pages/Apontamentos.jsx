import { useState } from "react";
import * as XLSX from "xlsx";
import Navbar from "../components/Navbar";

export default function Apontamentos() {
  const [filterText, setFilterText] = useState("");
  const [filteredCode, setFilteredCode] = useState("");
  const [apontamentos, setApontamentos] = useState([]);
  const [lockedSheets, setLockedSheets] = useState([]);

  // Atualiza status com validação
  const updateStatus = (id, newStatus) => {
    setApontamentos((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (newStatus !== "Pendente" && !item.entregador.trim()) {
          alert("Preencha o campo Entregador antes de alterar o status.");
          return item;
        }

        const today = new Date().toLocaleDateString("pt-BR");

        return {
          ...item,
          status: newStatus,
          coleta: item.coleta || today,
          devNotis: newStatus !== "Pendente" ? today : "",
        };
      })
    );
  };

  const handleEntregador = (id, value) => {
    setApontamentos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, entregador: value } : item
      )
    );
  };

  const applyFilter = () => setFilteredCode(filterText.trim());
  const clearFilter = () => {
    setFilterText("");
    setFilteredCode("");
  };

  const filteredList = apontamentos.filter((item) =>
    filteredCode
      ? item.codigo
          .toString()
          .toLowerCase()
          .includes(filteredCode.toLowerCase())
      : true
  );

  // Upload & leitura da planilha
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      // Verifica duplicados
      const existingCodes = new Set(apontamentos.map((item) => item.codigo));
      const newCodes = json.map((row) => row.Apontamento);

      if (newCodes.some((code) => existingCodes.has(code))) {
        alert("🚫 Há códigos duplicados. Nenhum dado foi importado.");
        return;
      }

      const today = new Date().toLocaleDateString("pt-BR");

      const newItems = json.map((row, index) => ({
        id: apontamentos.length + index + 1,
        entregador: "",
        bairro: row.Devedor || "",
        tipo: row.Apresentante || "",
        codigo: row.Apontamento || "",
        status: "Pendente",
        obs: "-",
        coleta: today,
        dataEF: "",
        devNotis: "",
        dev2Tab: file.name,
      }));

      setApontamentos((prev) => [...prev, ...newItems]);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <>
      <Navbar title="Apontamentos" />

      <div className="pt-20 px-4">
        {/* Upload */}
        <div className="mb-6">
          <label className="font-semibold block mb-1">
            📁 Importar planilha
          </label>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="border p-2 rounded w-full cursor-pointer"
          />
        </div>

        {/* Filtro */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Filtrar por código"
            className="border p-2 rounded flex-1"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button
            onClick={applyFilter}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Filtrar
          </button>
          <button
            onClick={clearFilter}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Limpar
          </button>
        </div>

        {/* Tabela */}
        <div className="overflow-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Entregador",
                  "Bairro",
                  "Tipo",
                  "Código",
                  "Status",
                  "Obs",
                  "Coleta",
                  "Prazo",
                  "Dev Notis",
                  "Planilha",
                ].map((title, i) => (
                  <th
                    key={i}
                    className="border px-3 py-2 text-left font-semibold"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredList.map((item) => (
                <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-2 py-1">
                    <select
                      value={item.entregador}
                      onChange={(e) =>
                        handleEntregador(item.id, e.target.value)
                      }
                      className="border rounded p-1 text-sm"
                    >
                      <option value="">Selecione</option>
                      <option>João Silva</option>
                      <option>Maria Oliveira</option>
                      <option>Carlos Santos</option>
                    </select>
                  </td>

                  <td className="border px-2">{item.bairro}</td>
                  <td className="border px-2">{item.tipo}</td>
                  <td className="border px-2 font-semibold text-center">
                    {item.codigo}
                  </td>

                  <td className="border px-2">
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="border rounded p-1 text-sm"
                    >
                      <option>Pendente</option>
                      <option>Entregue</option>
                      <option>Devolvido</option>
                      <option>Em trânsito</option>
                    </select>
                  </td>

                  <td className="border px-2">{item.obs}</td>
                  <td className="border px-2">{item.coleta}</td>
                  <td className="border px-2">{item.dataEF}</td>
                  <td className="border px-2">{item.devNotis}</td>
                  <td className="border px-2">{item.dev2Tab}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
