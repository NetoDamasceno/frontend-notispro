import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  Star,
  Folder,
  Wrench,
  BarChart3,
  Search,
  FileText,
  FolderOpen,
  ShieldCheck,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

export default function Navbar({ title = "Página" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("Usuário");
  const [perfilOpen, setPerfilOpen] = useState(false);
  const [mostrarModalSair, setMostrarModalSair] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  const goTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header
        className="h-16 flex items-center justify-between px-6 shadow-md 
        bg-white dark:bg-gray-900 
        text-black dark:text-white 
        fixed top-0 left-0 w-full z-50 transition-colors"
      >
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`transition-all duration-300 p-2 rounded-full hover:scale-110 ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <h3 className="ml-4 text-xl font-semibold">{title}</h3>
        </div>

        {/* PERFIL */}
        <div className="relative">
          <div
            onClick={() => setPerfilOpen(!perfilOpen)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <User size={22} />
            <span className="font-medium text-sm">{username}</span>
          </div>

          {perfilOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => {
                  setPerfilOpen(false);
                  setMostrarModalSair(true);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm 
                hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <LogOut size={16} className="text-red-600" />
                <span className="text-red-600 font-medium">Sair da conta</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MODAL DE LOGOUT */}
      <LogoutModal
        open={mostrarModalSair}
        onClose={() => setMostrarModalSair(false)}
      />

      {/* OVERLAY MENU */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/20 z-30"
        />
      )}

      {/* MENU DROPDOWN EM COLUNAS */}
      <div
        className={`fixed left-0 w-full backdrop-blur-md 
            bg-white/60 dark:bg-gray-800/70 
            shadow-lg p-6 z-40 rounded-b-xl 
            transition-colors duration-300 ${
              isMenuOpen ? "translate-y-16" : "-translate-y-full"
            }`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <nav
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-6 text-base
          max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain pr-3 pb-10"
        >
          {/* COLUNA 1 - FAVORITOS */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b pb-1 flex items-center gap-2">
              <Star size={18} /> Favoritos
            </h4>
            <ul className="space-y-2 dark:text-gray-200">
              <li
                className="cursor-pointer hover:underline"
                onClick={() => goTo("/importar-planilhas")}
              >
                Importar Planilhas
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => goTo("/apontamentos")}
              >
                Apontamentos
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => goTo("/entregador")}
              >
                Entregador
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => goTo("/configuracoes")}
              >
                Configurações
              </li>
            </ul>
          </div>

          {/* COLUNA 2 */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b pb-1 flex items-center gap-2">
              <Folder size={18} /> Gerência de Projetos
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li
                className="cursor-pointer hover:underline text-black dark:text-gray-200"
                onClick={() => goTo("/dashboard")}
              >
                Dashboard
              </li>
              <li>Atividades</li>
              <li>Planejamento</li>
              <li>Documentos</li>
            </ul>
          </div>

          {/* COLUNA 3 */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b pb-1 flex items-center gap-2">
              <Wrench size={18} /> Utilitários
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Importar Dados</li>
              <li>Exportar PDF</li>
              <li>Gerar Relatórios</li>
            </ul>
          </div>

          {/* COLUNA 4 */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b pb-1 flex items-center gap-2">
              <BarChart3 size={18} /> Gráficos
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Resumo de Entregas</li>
              <li>Performance</li>
              <li>Comparativos</li>
            </ul>
          </div>

          {/* COLUNA 5 */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b pb-1 flex items-center gap-2">
              <Search size={18} /> Consultas
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Histórico</li>
              <li>Registros</li>
              <li>Logs</li>
            </ul>
          </div>

          {/* COLUNA 6 */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b pb-1 flex items-center gap-2">
              <FileText size={18} /> Relatórios
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Mensais</li>
              <li>Financeiros</li>
              <li>Operacionais</li>
            </ul>
          </div>

          {/* COLUNA 7 */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b pb-1 flex items-center gap-2">
              <FolderOpen size={18} /> Documentos
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Arquivos</li>
              <li>Modelos</li>
              <li>Anexos</li>
            </ul>
          </div>

          {/* COLUNA 8 */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b pb-1 flex items-center gap-2">
              <ShieldCheck size={18} /> Controle de Acessos
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Perfis</li>
              <li>Permissões</li>
              <li>Logs de Segurança</li>
            </ul>
          </div>

          {/* COLUNA 9 */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b pb-1 flex items-center gap-2">
              <Settings size={18} /> Parametrizações
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Configurações Gerais</li>
              <li>Integrações</li>
              <li>Preferências do Sistema</li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
