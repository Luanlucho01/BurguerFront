// AuthContext.tsx
import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

interface UserType {
  email: string;
  // Outros dados do usuário, se necessário
}

interface AuthContextProps {
  user: UserType | null;
  loading: boolean;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  token: null,
  setToken: () => {},
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setLoading(false);
          return;
        }
        const response = await axios.get("http://localhost:8080/api/auth/getUserData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setUser({
            email: response.data.user.email,
          });
        } else {
          console.log(response.data.message || "Erro ao pegar informações do usuário");
        }
      } catch (err) {
        console.error("Erro ao pegar informações do usuário:", err);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchUserDetails();
  }, [token]);

  const logout = () => {
    // Remove o token e reseta o usuário
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Um hook para facilitar o uso do AuthContext:
export const useAuth = () => useContext(AuthContext);
