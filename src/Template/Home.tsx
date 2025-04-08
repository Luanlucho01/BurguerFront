import React, { useState, useEffect } from 'react';
import './Home.css'; // Certifique-se de que o caminho está correto
import { Link } from 'react-router-dom';
import fundoImage from '../assets/burger2.png'
import logo from '../assets/burgerlogo.png'; // Substitua pelo caminho da sua logo
import axios from 'axios';

interface UserData {
  email: string;
}

const Home: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);
  const [userData, setUserData ] = useState<UserData | null>(null);

  // Monitorar o evento de rolagem
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true); // Ativa o efeito quando rolar mais de 50px
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, []);
  const fetchUserDetails = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get(
        "http://localhost:8080/api/auth/getUserData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        console.log(response.data);
        setUserData({
          email: response.data.user.email,
        });
      } else {
        console.log(response.data.message || "Erro ao pegar informações do usuário")
      }
    } catch (err) {
      console.error("Erro ao pegar informações do usuário:", err);
    }
  }

  return (
    <>
      {/* Header com a logo e links */}
      <header className={`header ${scrolling ? 'scrolled' : ''}`}>
        <div className="header-left">
          <a href="#menu">Cardápio</a>
          <a href="#contact">Contato</a>
          <span>Email: { userData ? userData.email : "Carregando" }</span>
        </div>
        <div className="header-center">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="header-right">
          <Link to="/login">Login</Link>
        </div>
      </header>

      {/* Restante do conteúdo */}
      <div className="background" style={{ backgroundImage: `url(${fundoImage})` }}>
        <h1>Lanches como você nunca viu</h1>
      </div>

      <div className="divider"></div>

      <div className="menu-section" id='menu'>
        <h2>Nosso Cardápio</h2>
        <div className="menu-items">
          <div className="menu-card">
            <h3>Hamburguer Clássico</h3>
            <p>Carne, queijo, alface, tomate e molho especial</p>
            <span>R$ 19,90</span>
          </div>

          <div className="menu-card">
            <h3>Hamburguer Vegano</h3>
            <p>Proteina de soja, alface, tomate e molho vegano</p>
            <span>R$ 22,90</span>
          </div>

          <div className="menu-card">
            <h3>Hamburguer com Bacon</h3>
            <p>Carne, queijo, bacon crocante, alface e tomate</p>
            <span>R$ 24,90</span>
          </div>

          <div className="menu-card">
            <h3>Hamburguer de Frango</h3>
            <p>Frango grelhado, alface, tomate e maionese</p>
            <span>R$ 21,90</span>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <footer className="footer" id='contact'>
        <div className="footer-item local">
          <h3>Local</h3>
          <p>Rua Fictícia, 123 - Centro, Cidade Exemplo</p>
        </div>
        <div className="footer-item contact">
          <h3>Contato</h3>
          <p>(11) 1234-5678</p>
        </div>
        <div className="footer-item social">
          <h3>Redes Sociais</h3>
          <p><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></p>
          <p><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></p>
          <p><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></p>
        </div>
      </footer>
    </>
  );
}

export default Home;
