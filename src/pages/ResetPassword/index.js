/* eslint-disable no-useless-return */
import { useState, useRef } from 'react';

import { useParams, Link } from 'react-router-dom';

import * as C from './styles';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import MessageContainer from '../../components/MessageContainer';

import useErrors from '../../hooks/useErrors';

import UserService from '../../services/UserService';

export default function ResetPassword() {
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);
  const [errorAPI, setErrorAPI] = useState('');
  const [messageAPI, setMessageAPI] = useState('');

  const token = useRef('');
  const password = useRef('');
  const passwordCheck = useRef('');

  const { email } = useParams();

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!token.current.value) {
      setError({ field: 'token', message: 'Campo obrigatorio' });
    } else {
      removeError('token');
    }

    if (!password.current.value) {
      setError({ field: 'password', message: 'Senha é obrigatorio' });
    } else {
      removeError('password');
    }

    if (password.current.value < 6) {
      setError({ field: 'password', message: 'Insira uma senha mais forte' });
    } else {
      removeError('password');
    }

    if (!passwordCheck.current.value) {
      setError({ field: 'passwordCheck', message: 'Senha é obrigatorio' });
    } else {
      removeError('passwordCheck');
    }

    if (password.current.value !== passwordCheck.current.value) {
      setError({ field: 'password', message: 'As senhas não batem' });
      setError({ field: 'passwordCheck', message: 'As senhas não batem' });
    } else {
      removeError('password');
      removeError('passwordCheck');
    }

    if (errors.length > 0) {
      return;
    }

    try {
      setIsLoadingAPI(true);

      await UserService.resetPassword({
        email, token: token.current.value, password: password.current.value,
      });

      setErrorAPI('');
      setMessageAPI('Senha redefinida com sucesso clique em "entrar" abaixo e faça login!');
      event.target.reset();
    } catch (error) {
      setMessageAPI('');
      setErrorAPI(error.message);
    } finally {
      setIsLoadingAPI(false);
    }
  }

  return (
    <C.Container>
      <Loader isLoading={isLoadingAPI} />
      <h2>Redefinir senha</h2>
      <strong>Digite o código enviado para o seu e-mail</strong>

      {(errorAPI && !messageAPI) && (
        <MessageContainer error text={errorAPI} />
      )}

      {(messageAPI && !errorAPI) && (
        <MessageContainer text={messageAPI} />
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup error={getErrorMessageByFieldName('token')}>
          <Input
            placeholder="Digite o códido"
            ref={token}
            error={getErrorMessageByFieldName('token')}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName('password')}>
          <Input
            placeholder="Nova senha"
            type="password"
            ref={password}
            error={getErrorMessageByFieldName('password')}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName('passwordCheck')}>
          <Input
            placeholder="Confirme a senha"
            type="password"
            ref={passwordCheck}
            error={getErrorMessageByFieldName('passwordCheck')}
          />
        </FormGroup>
        <Button type="submit">Redefinir</Button>
      </form>
      {messageAPI && (
        <Link to="/">Entrar</Link>
      )}
    </C.Container>
  );
}
