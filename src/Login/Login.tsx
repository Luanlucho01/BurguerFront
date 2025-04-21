import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';
import Header from '../components/Headers';
import { useAuth } from '../Autenticação/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Buscar os usuários cadastrados no localStorage
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Verificar se existe um usuário com esse e-mail e senha
    const usuarioEncontrado = usuariosSalvos.find(
      (user: any) => user.email === email && user.senha === senha
    );

    if (usuarioEncontrado) {
      toast.success("Login realizado com sucesso!");
      const fakeToken = "token123"; // token simulado
      localStorage.setItem("authToken", fakeToken);
      setToken(fakeToken);
      navigate("/");
    } else {
      toast.error("E-mail ou senha incorretos.");
    }
  };

  return (
    <>
      <Header scrolling={true} />

      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
              />
            </div>
            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                name="senha"
                value={senha}
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
