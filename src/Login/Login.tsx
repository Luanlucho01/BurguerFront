import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Não se esqueça de criar o arquivo CSS
import axios from 'axios';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [email, setEmail]=useState("")
  const [senha, setSenha]=useState("")
  const navigate = useNavigate();

  const handleSubmit=async(e: React.FormEvent)=>{
    e.preventDefault();
    console.log(email, senha);
    
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login-user", {email, senha:senha});

      if (response.data.success) {
        toast.success(response.data.message || 'Logado com sucesso');
        console.log(response);
        const token=response.data.token;
        sessionStorage.setItem("authToken", token);
        navigate("/")

      } else {
        toast.error(response.data.message || "Erro ao logar");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro durante o login", error);
        toast.error(error.response?.data?.message || "Erro desconhecido");
      } else {
        console.error("Erro inesperado", error);
        toast.error("Erro desconhecido");
      }
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name='email'
              onChange={e=>setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name='senha'
              onChange={e=>setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>
          <button type="submit" className="login-btn">Entrar</button>
        </form>
        <p className='signup-link'>
            Não tem conta? <Link to={"/Cadastro"}>Crie aqui!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
