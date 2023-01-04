import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [erro, setErro] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setErro(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const req = await fetch(url, options);
    const json = await req.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setErro(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const req = await fetch(url, options);

      if (!req.ok) throw new Error(`Erro: Usuário Inválido`);
      const { token } = await req.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');

    } catch (err) {
      setErro(err.message);
      setLogin(false);

    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setErro(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const req = await fetch(url, options);
          
          if (!req.ok) throw new Error('Token Inválido');
          await getUser(token);

        } catch (err) {
          userLogout();

        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false)
      }
    }

    autoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{ userLogin, data, userLogout, erro, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
