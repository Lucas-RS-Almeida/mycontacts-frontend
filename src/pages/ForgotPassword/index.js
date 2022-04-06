/* eslint-disable no-useless-return */
import { useState, useRef } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import * as C from './styles';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import MessageContainer from '../../components/MessageContainer';

import isEmailValid from '../../utils/isEmailValid';

import useErrors from '../../hooks/useErrors';

import UserService from '../../services/UserService';

export default function ForgotPassword() {
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);
  const [errorAPI, setErrorAPI] = useState('');

  const email = useRef('');

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (email.current.value && !isEmailValid(email.current.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }

    if (errors.length > 0) {
      return;
    }

    try {
      setIsLoadingAPI(true);

      await UserService.forgoutPassword(email.current.value);

      setErrorAPI('');
      navigate(`/reset-password/${email.current.value}`);
    } catch (error) {
      setErrorAPI(error.message);
    } finally {
      setIsLoadingAPI(false);
    }
  }

  return (
    <C.Container>
      <Loader isLoading={isLoadingAPI} />
      <h2>Redefina sua senha</h2>
      <strong>Digite seu e-mail para receber um código</strong>

      {errorAPI && (
        <MessageContainer error text={errorAPI} />
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup error={getErrorMessageByFieldName('email')}>
          <Input
            placeholder="Digite seu e-mail"
            ref={email}
            error={getErrorMessageByFieldName('email')}
          />
        </FormGroup>
        <Button type="submit">Próxima</Button>
      </form>
      <Link to="/">Voltar</Link>
    </C.Container>
  );
}
