import { useState, useContext } from 'react';

import { useParams } from 'react-router-dom';

import { Context } from '../../contexts/AuthContext';

import { Container } from './styles';

import PageHeader from '../../components/PageHeader';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MessageContainer from '../../components/MessageContainer';
import Loader from '../../components/Loader';

import useErrors from '../../hooks/useErrors';

import UserService from '../../services/UserService';

import isEmailValid from '../../utils/isEmailValid';

export default function ChangeEmail() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);
  const [errorAPI, setErrorAPI] = useState('');
  const [messageAPI, setMessageAPI] = useState('');

  const { id } = useParams();

  const { token } = useContext(Context);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = ((currentEmail && newEmail) && (errors.length === 0));

  function handleChangeCurrentEmail(event) {
    setCurrentEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'currentEmail', message: 'E-mail inválido' });
    } else {
      removeError('currentEmail');
    }
  }

  function handleChangeNewEmail(event) {
    setNewEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'newEmail', message: 'E-mail inválido' });
    } else {
      removeError('newEmail');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsLoadingAPI(true);

      await UserService.changeEmail(id, { currentEmail, newEmail }, token);

      setMessageAPI('E-mail alterado com sucesso!');
      setErrorAPI('');
    } catch (error) {
      setMessageAPI('');
      setErrorAPI(error.message);
    } finally {
      setIsLoadingAPI(false);
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoadingAPI} />

      <PageHeader
        title="Mudar e-mail"
      />

      {(messageAPI && !errorAPI) && (
        <MessageContainer text={messageAPI} />
      )}

      {(errorAPI && !messageAPI) && (
        <MessageContainer error text={errorAPI} />
      )}

      <form onSubmit={handleSubmit} noValidate>
        <FormGroup error={getErrorMessageByFieldName('currentEmail')}>
          <Input
            type="email"
            placeholder="E-mail atual"
            value={currentEmail}
            onChange={handleChangeCurrentEmail}
            error={getErrorMessageByFieldName('currentEmail')}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName('newEmail')}>
          <Input
            type="email"
            placeholder="Novo e-mail"
            value={newEmail}
            onChange={handleChangeNewEmail}
            error={getErrorMessageByFieldName('newEmail')}
          />
        </FormGroup>
        <Button type="submit" disabled={!isFormValid}>Mudar e-mail</Button>
      </form>
    </Container>
  );
}
