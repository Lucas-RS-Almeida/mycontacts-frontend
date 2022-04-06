import { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';

import { Context } from '../../contexts/AuthContext';

import * as C from './styles';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import MessageContainer from '../../components/MessageContainer';

import useErrors from '../../hooks/useErrors';

import isEmailValid from '../../utils/isEmailValid';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const {
    errorAPI,
    messageAPI,
    setErrorAPI,
    setMessageAPI,
    isLoadingUser,
    onSignUp,
  } = useContext(Context);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (email && password && passwordCheck) && (errors.length === 0);

  useEffect(() => {
    setErrorAPI('');
    setMessageAPI('');
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
      setError({ field: 'password', message: 'Campo senha é obrigatorio' });
    } else {
      removeError('password');
    }

    if (event.target.value === passwordCheck) {
      removeError('passwordCheck');
    }
  }

  function handleChangepasswordCheck(event) {
    setPasswordCheck(event.target.value);

    if (event.target.value !== password) {
      setError({ field: 'passwordCheck', message: 'As senhas não batem' });
    } else {
      removeError('passwordCheck');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== passwordCheck) {
      setError({ field: 'password', message: 'As senhas não batem' });
      setError({ field: 'passwordCheck', message: 'As senhas não batem' });
    } else {
      removeError('password');
      removeError('passwordCheck');
    }

    if (errors.length > 0) {
      return;
    }

    onSignUp({ email, password });
  }

  return (
    <C.Container>
      <Loader isLoading={isLoadingUser} />
      <C.FormHeader>
        <span>registre-se com seus dados pessoais.</span>
      </C.FormHeader>

      {(errorAPI && !messageAPI) && (
        <MessageContainer error text={errorAPI} />
      )}

      {(messageAPI && !errorAPI) && (
        <MessageContainer text={messageAPI} />
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
            type="password"
            placeholder="Senha"
            value={password}
            onChange={handleChangePassword}
            error={getErrorMessageByFieldName('password')}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName('passwordCheck')}>
          <Input
            type="password"
            placeholder="Confirme a senha"
            value={passwordCheck}
            onChange={handleChangepasswordCheck}
            error={getErrorMessageByFieldName('passwordCheck')}
          />
        </FormGroup>
        <Button type="submit" disabled={!isFormValid}>Registrar</Button>
      </form>

      <C.FormFooter>
        <span>
          Já tem conta?
          <Link to="/">Entrar</Link>
        </span>
      </C.FormFooter>
    </C.Container>
  );
}
