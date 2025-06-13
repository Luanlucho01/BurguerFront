import React, { useState, useEffect } from 'react';
import './Home.css'; // Certifique-se de que o caminho está correto
import { Link } from 'react-router-dom';
import HamburguerImage from '../assets/hamburguer react.png'
import Header from '../components/Headers';
import { useAuth } from '../Autenticação/AuthContext';

const Home: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);
  const { user, loading } = useAuth();

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

  return (
    <>
       <Header scrolling={scrolling} />

      {/* Restante do conteúdo */}
      <div className="background">
        <h2 className='title-hamburguer'>Lanches como você</h2>
        <img src={HamburguerImage} alt="" className='hamburguer'/>
        <h3 className='subtitle-hamburguer2'>nunca viu!</h3>
      </div>

      {/* Testando a Autenticação Global na página home 
      <div className="user-greeting" style={{ padding: "1rem", textAlign: "center" }}>
        {loading ? (
          <p>Carregando informações do usuário...</p>
        ) : user ? (
          <p>Bem-vindo, {user.email}!</p>
        ) : (
          <p>Olá, visitante! Faça login para ver uma experiência personalizada.</p>
        )}
      </div> */}


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

        
      {/*  
      Exemplo de lugar onde o usuário só pode acessar se ele estiver logado.
      <div className="exclusive-section" style={{ padding: '2rem', textAlign: 'center' }}>
        {user ? (
          <>
            <h2>Área Exclusiva</h2>
            <p>Bem-vindo à área exclusiva, {user.email}!</p>
            <p>Aqui você encontra ofertas e conteúdos especiais somente para usuários logados.</p>
            <Link to="/exclusiva" className="btn">Acessar Área Exclusiva</Link>
          </>
        ) : (
          <>
            <h2>Área Exclusiva</h2>
            <p>Você precisa estar logado para acessar esta área.</p>
            <Link to="/login" className="btn">Faça Login</Link>
          </>
        )}
      </div> */}

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
