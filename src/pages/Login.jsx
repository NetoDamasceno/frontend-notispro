import React, { useState } from "react";
import loginBg from "../assets/login_image.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (user && password) {
      localStorage.setItem("username", user);
      navigate("/dashboard");
    }
  };

  return (
    <div className="h-screen w-screen flex">
      {/* --- LADO ESQUERDO: FORMULÁRIO --- */}
      <div className="w-1/3 bg-white flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-3/4 max-w-sm flex flex-col gap-4"
        >
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className="px-3 py-2 border rounded-md"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 py-2 border rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>

      {/* --- LADO DIREITO COM A IMAGEM --- */}
      <div className="w-2/3 relative">
        {/* ⚠️ INSIRA AQUI O CAMINHO DA IMAGEM DE LOGIN EX: /assets/login.jpg */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        />

        {/* Sobreposição opcional para deixar mais suave */}
        <div className="absolute inset-0 bg-white/10" />
      </div>
    </div>
  );
}
