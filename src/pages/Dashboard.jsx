import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser || "Usuário");
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar title="Dashboard" />

      <main className="p-6 pt-20">
        <h1 className="text-2xl font-semibold">Olá, {username}</h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo ao sistema de apontamentos.
        </p>
      </main>
    </div>
  );
}
