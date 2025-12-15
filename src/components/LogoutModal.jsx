import { useNavigate } from "react-router-dom";

export default function LogoutModal({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const sairDaConta = () => {
    localStorage.removeItem("username");
    onClose();
    navigate("/");
  };

  return (
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
            onClick={onClose}
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
  );
}
