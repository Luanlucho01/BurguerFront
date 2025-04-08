import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Template/Home.css'; 
import logo from '../assets/burgerlogo.png'; // Certifique-se de que o caminho está correto

interface HeaderProps {
  userData: {
    email: string;
  } | null;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");

  const logout=()=>{
    localStorage.clear();
    navigate('/login');
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scrolling ? 'scrolled' : ''}`}>
      <div className="header-left">
        <a href="/">Cardápio</a>
        <a href="/">Contato</a>
        {isLoggedIn && userData && (
            <span>Email: {userData.email}</span>
        )}
      </div>
      <div className="header-center">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="header-right">
        {isLoggedIn ? (
            <>
            <div className='user-info'>
                <span className='user-email'>{userData?.email}</span>
                <button onClick={logout} className='logout-btn'>Logout</button>
                
            </div>
            </>
        ) : (
            <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
