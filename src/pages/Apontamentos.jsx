import { useState } from "react";
import * as XLSX from "xlsx";
import Navbar from "../components/Navbar";

export default function Apontamentos() {
  const [filterText, setFilterText] = useState("");
  const [filteredCode, setFilteredCode] = useState("");
  const [apontamentos, setApontamentos] = useState([]);

  const todayISO = () => new Date().toISOString().split("T")[0];
  const todayBR = () => new Date().toLocaleDateString("pt-BR");

  // 🔄 Atualiza status com regras de negócio
  const updateStatus = (id, newStatus) => {
    setApontamentos((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (newStatus !== "Pendente") {
          if (!item.entregador) {
            alert("Preencha o entregador antes de alterar o status.");
            return item;
          }

          if (!item.dataEF) {
            alert("Preencha a Data EF/VT antes de alterar o status.");
            return item;
          }

          if (item.dataEF < item.coleta) {
            alert("Data EF/VT não pode ser menor que a data de Coleta.");
            return item;
          }
        }

        return {
          ...item,
          status: newStatus,
          devNotis: newStatus !== "Pendente" ? todayISO() : "",
        };
      })
    );
  };

  const handleChange = (id, field, value) => {
    setApontamentos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
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

  // 📥 Upload da planilha
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      const existingCodes = new Set(apontamentos.map((item) => item.codigo));
      const newCodes = json.map((row) => row.Apontamento);

      if (newCodes.some((code) => existingCodes.has(code))) {
        alert("🚫 Há códigos duplicados. Nenhum dado foi importado.");
        return;
      }

      const newItems = json.map((row, index) => ({
        id: apontamentos.length + index + 1,
        entregador: "",
        bairro: row.Devedor || "",
        tipo: row.Apresentante || "",
        codigo: row.Apontamento || "",
        status: "Pendente",
        obs: "",
        coleta: todayISO(), // data do carimbo
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
          <label className="font-semibold block mb-1 dark:text-white">
            📁 Importar planilha
          </label>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="border p-2 rounded w-full cursor-pointer dark:bg-gray-800 dark:text-white"
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Filtrar
          </button>
          <button
            onClick={clearFilter}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
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
                  "EF/VT",
                  "Dev Notis",
                  "Planilha",
                ].map((title, i) => (
                  <th key={i} className="border px-3 py-2">
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
                        handleChange(item.id, "entregador", e.target.value)
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
                  <td className="border px-2 text-center font-semibold">
                    {item.codigo}
                  </td>

                  <td className="border px-2">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(item.id, e.target.value)
                      }
                      className="border rounded p-1 text-sm"
                    >
                      <option>Pendente</option>
                      <option>Entregue</option>
                      <option>Devolvido</option>
                      <option>Em trânsito</option>
                    </select>
                  </td>

                  <td className="border px-2">
                    <input
                      type="text"
                      value={item.obs}
                      onChange={(e) =>
                        handleChange(item.id, "obs", e.target.value)
                      }
                      className="border rounded p-1 text-sm w-full"
                    />
                  </td>

                  <td className="border px-2">{item.coleta}</td>

                  <td className="border px-2">
                    <input
                      type="date"
                      value={item.dataEF}
                      onChange={(e) =>
                        handleChange(item.id, "dataEF", e.target.value)
                      }
                      className="border rounded p-1 text-sm"
                    />
                  </td>

                  <td className="border px-2">
                    {item.devNotis || "-"}
                  </td>

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
