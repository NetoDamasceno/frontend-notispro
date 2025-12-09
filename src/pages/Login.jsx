import React, { useState, useEffect } from "react";
import loginBg from "../assets/login_image.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // --- REGEX PROFISSIONAIS ---
  const usernameRegex = /^[A-Za-zÀ-ÿ ]{3,40}$/; 
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleLogin = (e) => {
    e.preventDefault();

    // Validação do usuário
    if (!usernameRegex.test(user)) {
      setError("Usuário deve conter apenas letras e espaços (entre 3 e 40 caracteres).");
      return;
    }

    // Validação da senha
    if (!passwordRegex.test(password)) {
      setError("Senha deve ter no mínimo 6 caracteres, incluindo letras e números.");
      return;
    }

    // Login aceito — TODO: substituir por autenticação real no futuro
    localStorage.setItem("username", user);
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row relative overflow-hidden">

      {/* 📌 FUNDO MOBILE */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="absolute inset-0 backdrop-blur-md bg-black/30" />
      </div>

      {/* --- FORMULÁRIO --- */}
      <div
        className="
        w-full md:w-1/3 flex items-center justify-center 
        relative z-10 min-h-screen md:min-h-0
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
          <h2 className="text-2xl font-semibold text-center dark:text-white">Login</h2>

          {/* Mostra erro caso exista */}
          {error && (
            <div className="bg-red-500/80 text-white p-2 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className="px-3 py-2 border rounded-md dark:bg-gray-900 dark:text-white"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 py-2 border rounded-md dark:bg-gray-900 dark:text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>

      {/* --- IMAGEM DESKTOP --- */}
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
