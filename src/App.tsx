import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React from 'react';
import Home from './Template/Home';
import Login from './Login/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './Cadastro/Cadastro';
import { AuthProvider } from './Autenticação/AuthContext';

function App() {
  return (
    <div className="container">
      <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Cadastro />} />
        </Routes>
        <ToastContainer
          position='top-center'
          autoClose={1000}
          hideProgressBar={true}
          closeOnClick
          theme='colored'
        />
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
