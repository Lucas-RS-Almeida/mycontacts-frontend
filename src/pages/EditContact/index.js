import { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';

import { Context } from '../../contexts/AuthContext';

import * as C from './styles';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import MessageContainer from '../../components/MessageContainer';
import Loader from '../../components/Loader';

import ContactService from '../../services/ContactService';

export default function EditContact() {
  const { id } = useParams();
  const { token } = useContext(Context);

  const [contact, setContact] = useState({});
  const [errorAPI, setErrorAPI] = useState('');
  const [messageAPI, setMessageAPI] = useState('');
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  useEffect(() => {
    async function getContactById() {
      try {
        setIsLoadingAPI(true);

        const response = await ContactService.getById(id, token);

        setContact(response);
        setErrorAPI('');
      } catch (error) {
        setErrorAPI(error.message);
      } finally {
        setIsLoadingAPI(false);
      }
    }

    getContactById();
  }, [id]);

  if (Object.keys(contact).length < 1) {
    return false;
  }

  async function handleSubmit({
    name, email, phone, categoryId,
  }) {
    try {
      await ContactService.update(id, {
        name, email, phone, categoryId,
      }, token);

      setErrorAPI('');
      setMessageAPI('Contato editado com sucesso');
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
        title="Editar contato"
      />

      {(messageAPI && !errorAPI) && (
        <MessageContainer text={messageAPI} />
      )}

      {(errorAPI && !messageAPI) && (
        <MessageContainer error text={errorAPI} />
      )}

      <ContactForm
        textButton="Editar"
        nameEdit={contact.name}
        emailEdit={contact.email}
        phoneEdit={contact.phone}
        categoryId={contact.category_id}
        onFunction={handleSubmit}
      />
    </C.Container>
  );
}
