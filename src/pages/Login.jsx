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
    <div className="h-screen w-screen flex flex-col md:flex-row relative overflow-hidden">

      {/* 📌 FUNDO COM IMAGEM PARA MOBILE */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        {/* Layer de blur + dark */}
        <div className="absolute inset-0 backdrop-blur-md bg-black/30" />
      </div>

      {/* --- FORMULÁRIO --- */}
      <div
        className="
        w-full md:w-1/3
        flex items-center justify-center 
        relative z-10
        
        /* MOBILE: Centraliza verticalmente */
        min-h-screen md:min-h-0
        "
      >
        <form
          onSubmit={handleLogin}
          className="
          w-3/4 max-w-sm flex flex-col gap-4 
          bg-white/80 md:bg-transparent 
          p-6 rounded-lg md:p-0 shadow-md md:shadow-none
          "
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

      {/* --- IMAGEM PARA DESKTOP --- */}
      <div className="hidden md:block w-2/3 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${loginBg})` }}
        />
        <div className="absolute inset-0 bg-white/10" />
      </div>
    </div>
  );
}
