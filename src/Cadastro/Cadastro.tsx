import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';
import { toast } from "react-toastify";
import Header from '../components/Headers';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    // Criar um novo usuário com ID único
    const novoUsuario = {
      id: Date.now(),
      ...formValues
    };

    // Obter usuários já salvos
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Verificar se o e-mail já existe
    const emailExistente = usuariosSalvos.find((user: any) => user.email === formValues.email);
    if (emailExistente) {
      toast.error("Este e-mail já está cadastrado.");
      return;
    }

    // Adicionar e salvar no localStorage
    usuariosSalvos.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));

    toast.success("Usuário cadastrado com sucesso!");

    setFormValues({ email: "", senha: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
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
