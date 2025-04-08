import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../components/Header'; // Importando o Header

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login-user", { email, senha });


      if (response.data.success) {
        toast.success(response.data.message || 'Logado com sucesso');
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("keepLoggedIn",JSON.stringify(true));
        navigate("/");
      } else {
        toast.error(response.data.message || "Erro ao logar");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Erro desconhecido");
      } else {
        toast.error("Erro inesperado");
      }
    }
  };

  return (
    <>
      <Header userData={null} /> {/* Adicionando o Header à página */}
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                name="senha"
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>
            <button type="submit" className="login-btn">Entrar</button>
          </form>
          <p className="signup-link">
            Não tem conta? <Link to={"/Cadastro"}>Crie aqui!</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
