import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';
import { toast } from "react-toastify";
import Header from '../components/Headers';
import axios from 'axios';

const Cadastro: React.FC = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    senha: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    email: '',
    senha: ''
  });

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formValues.email) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = 'Formato de email inválido';
    }

    if (!formValues.senha) {
      errors.senha = 'Senha é obrigatória';
    } else if (formValues.senha.length < 4) {
      errors.senha = 'Senha muito curta';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors=(formValues)
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register-user",formValues);
      console.log(response, 'res');

      if (response.data.success) {
        toast.success(response.data.message || 'Registration succesfull!');
        setFormValues({email:"",senha:""});
      } else {
        toast.error(response.data.message || "Erro ao registrar");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro durante o registro", error);
        toast.error(error.response?.data?.message || "Erro desconhecido");
      } else {
        console.error("Erro inesperado", error);
        toast.error("Erro desconhecido");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    console.log(formValues);
  };

  return (
    <>
      <Header scrolling={true} />

      <div className="cadastro-container">
        <div className="cadastro-box">
          <h2>Cadastro</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>E-mail</label>
              <input
                type="text"
                placeholder="Digite seu e-mail"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className='error-message'>{errors.email}</span>}
            </div>

            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                value={formValues.senha}
                onChange={handleInputChange}
              />
              {errors.senha && <span className='error-message'>{errors.senha}</span>}
            </div>

            <button type="submit" className="cadastro-btn">Cadastrar</button>
          </form>

          <p className="signup-link">
            Já possui uma conta? <Link to={"/Login"}>Entre aqui!</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Cadastro;
