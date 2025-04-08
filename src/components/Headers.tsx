// Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import '../Template/Home.css';
import logo from '../assets/burgerlogo.png';
import { useAuth } from "../Autenticação/AuthContext";

interface HeaderProps {
  scrolling: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolling }) => {
  const { user, loading, logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

  return (
    <header className={`header ${scrolling ? 'scrolled' : ''}`}>
      <div className="header-left">
        <a href="#menu">Cardápio</a>
        <a href="#contact">Contato</a>
        <span>
          Email: {loading ? "Carregando" : (user ? user.email : "Não logado")}
        </span>
      </div>
      <div className="header-center">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="header-right">
        {user ? (
            <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Impede a navegação padrão
              handleLogout();
            }}
          >
            Logout
          </a>
        ) : (
            <Link to="/login">Login</Link>
        )}
        
      </div>
    </header>
  );
};

export default Header;
