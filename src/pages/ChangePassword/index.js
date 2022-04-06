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

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
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

  const isFormValid = ((currentPassword && newPassword) && (errors.length === 0));

  function handleChangeCurrentPassword(event) {
    setCurrentPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'currentPassword', message: 'Campo senha atual é obrigatório' });
    } else {
      removeError('currentPassword');
    }
  }

  function handleChangeNewPassword(event) {
    setNewPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'newPassword', message: 'Campo nova senha é obrigatório' });
    } else {
      removeError('newPassword');
    }
  }

  function handleChangeCheckPassword(event) {
    setCheckPassword(event.target.value);

    if (!event.target.value) {
      setError({ field: 'checkPassword', message: 'Campo confirmar senha é obrigatório' });
    } else {
      removeError('checkPassword');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsLoadingAPI(true);

      await UserService.changePassword(id, { currentPassword, newPassword }, token);

      setMessageAPI('Senha alterada com sucesso!');
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
        title="Trocar senha"
      />

      {(messageAPI && !errorAPI) && (
        <MessageContainer text={messageAPI} />
      )}

      {(errorAPI && !messageAPI) && (
        <MessageContainer error text={errorAPI} />
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup error={getErrorMessageByFieldName('currentPassword')}>
          <Input
            type="password"
            placeholder="Senha atual"
            value={currentPassword}
            onChange={handleChangeCurrentPassword}
            error={getErrorMessageByFieldName('currentPassword')}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName('newPassword')}>
          <Input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={handleChangeNewPassword}
            error={getErrorMessageByFieldName('newPassword')}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName('checkPassword')}>
          <Input
            type="password"
            placeholder="Confirme a nova senha"
            value={checkPassword}
            onChange={handleChangeCheckPassword}
            error={getErrorMessageByFieldName('checkPassword')}
          />
        </FormGroup>
        <Button type="submit" disabled={!isFormValid}>Trocar senha</Button>
      </form>
    </Container>
  );
}
