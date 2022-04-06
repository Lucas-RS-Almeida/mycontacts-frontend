import { useState, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Context } from '../../contexts/AuthContext';

import * as C from './styles';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import MessageContainer from '../../components/MessageContainer';

import useError from '../../hooks/useErrors';

import isEmailValid from '../../utils/isEmailValid';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    errorAPI, onLogin, isLoadingUser, setErrorAPI,
  } = useContext(Context);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useError();

  const isFormValid = (password && (errors.length === 0));

  useEffect(() => {
    setErrorAPI('');
  }, []);

  function handleChangeEmail(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'password', message: 'Campo senha é obrigatório' });
    } else {
      removeError('password');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    onLogin({ email, password });
  }

  return (
    <C.Container>
      <Loader isLoading={isLoadingUser} />
      <C.FormHeader>
        <span>faça login com seus dados pessoais.</span>
      </C.FormHeader>

      {errorAPI && (
        <MessageContainer error text={errorAPI} />
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup error={getErrorMessageByFieldName('email')}>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={handleChangeEmail}
            error={getErrorMessageByFieldName('email')}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName('password')}>
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={handleChangePassword}
            error={getErrorMessageByFieldName('password')}
          />
        </FormGroup>
        <Button type="submit" disabled={!isFormValid}>Entrar</Button>
      </form>

      <C.FormFooter>
        <Link to="/forgot-password">Esqueceu a senha?</Link>
        <span>
          Não tem conta?
          <Link to="/signup">Registre-se</Link>
        </span>
      </C.FormFooter>
    </C.Container>
  );
}
