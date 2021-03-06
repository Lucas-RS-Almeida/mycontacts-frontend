/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

export const Context = createContext();

export default function AuthProvider({ children }) {
  const [userArr, setUserArr] = useState({});
  const [tokenLoad, setTokenLoad] = useState('');
  const [errorAPI, setErrorAPI] = useState('');
  const [messageAPI, setMessageAPI] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    async function getMe() {
      try {
        const token = JSON.parse(localStorage.getItem('token')) || undefined;

        const response = await UserService.getMe(token);

        setTokenLoad(token);
        setUserArr(response);
        setAuthenticated(true);
      } catch {
        localStorage.clear();
      }
    }

    getMe();
  }, []);

  async function handleLogin({ email, password }) {
    try {
      setIsLoadingUser(true);

      const response = await AuthService.logIn({ email, password });

      const { token, user } = response;

      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));

      setAuthenticated(true);
      setUserArr(user);
      setTokenLoad(token);
      setErrorAPI('');
    } catch (error) {
      setErrorAPI(error.message);
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function handleSignUp({ email, password }) {
    try {
      setIsLoadingUser(true);

      await AuthService.signUp({ email, password });

      setErrorAPI('');
      setMessageAPI('Usuário criado com sucesso, clique em entrar abaixo!');
    } catch (error) {
      setMessageAPI('');
      setErrorAPI(error.message);
    } finally {
      setIsLoadingUser(false);
    }
  }

  return (
    <Context.Provider value={{
      user: userArr,
      token: tokenLoad,
      errorAPI,
      messageAPI,
      authenticated,
      isLoadingUser,
      setErrorAPI,
      setMessageAPI,
      onLogin: handleLogin,
      onSignUp: handleSignUp,
    }}
    >
      {children}
    </Context.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
