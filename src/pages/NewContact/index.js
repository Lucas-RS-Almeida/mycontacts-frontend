import { useState, useContext } from 'react';

import { Context } from '../../contexts/AuthContext';

import * as C from './styles';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import MessageContainer from '../../components/MessageContainer';
import Loader from '../../components/Loader';

import ContactService from '../../services/ContactService';

export default function NewContact() {
  const { token } = useContext(Context);

  const [errorAPI, setErrorAPI] = useState('');
  const [messageAPI, setMessageAPI] = useState('');
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  async function handleSubmit({
    name, email, phone, categoryId,
  }) {
    try {
      setIsLoadingAPI(true);

      const newContact = await ContactService.create(token, {
        name, email, phone, categoryId,
      });

      setErrorAPI('');
      setMessageAPI(`Contato "${newContact.name}" criado com sucesso!`);
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
      <PageHeader
        title="Novo contato"
      />

      {(messageAPI && !errorAPI) && (
        <MessageContainer text={messageAPI} />
      )}

      {(errorAPI && !messageAPI) && (
        <MessageContainer error text={errorAPI} />
      )}

      <ContactForm
        textButton="Cadastrar"
        onFunction={handleSubmit}
      />
    </C.Container>
  );
}
