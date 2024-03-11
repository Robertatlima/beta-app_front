import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  children: ReactNode;
}

interface UserData {
  username: string;
  password: string;
}

interface AuthProviderData {
  authToken: string;
  isAuth: boolean;
  logar: (userData: UserData) => void;
  deslogar: () => void;
  erro: string | null;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProps) => {
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || ""
  );
  const [erro, setErro] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(!!authToken);

  const navigate = useNavigate();

  const logar = async (userData: UserData) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao autenticar usuário");
      }

      const data = await response.json();
      localStorage.setItem("token", data.accessToken);
      setErro(null);
      setAuthToken(data.token);
      setIsAuth(true);
      navigate("/dashboard");
    } catch (err) {
      setErro("Nome de usuário ou senha incorretos");
      setIsAuth(false);
      setTimeout(() => {
        setErro(null);
      }, 5000);
    }
  };

  const deslogar = () => {
    localStorage.clear();
    setAuthToken("");
    setIsAuth(false);
    console.log("deslogou");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authToken, deslogar, logar, erro, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
