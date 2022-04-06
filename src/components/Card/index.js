import PropTypes from 'prop-types';

import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import { Context } from '../../contexts/AuthContext';

import * as C from './styles';

import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

import Modal from '../Modal';

import ContactService from '../../services/ContactService';

export default function Card({ contact, setIsReloadContacts, isReloadContacts }) {
  const { token } = useContext(Context);

  const [modal, setModal] = useState(false);

  async function handleDeleteContact() {
    await ContactService.delete(contact.id, token);

    setIsReloadContacts(!isReloadContacts);
  }

  function handleOpenModal() {
    setModal(true);
  }

  return (
    <C.Container>
      {modal && (
        <Modal
          text={`Deseja mesmo deletar "${contact.name}"?`}
          danger={modal}
          setIsModal={setModal}
          onFunction={handleDeleteContact}
        />
      )}
      <C.CardInformations>
        <div className="card-name">
          <strong>{contact.name}</strong>
          {contact.category_name && <small>{contact.category_name}</small>}
        </div>
        <span>{contact?.email}</span>
        <span>{contact?.phone}</span>
      </C.CardInformations>
      <C.CardActions>
        <Link to={`/editcontact/${contact.id}`}>
          <img src={edit} alt="Edit" />
        </Link>
        <button
          type="button"
          onClick={handleOpenModal}
        >
          <img src={trash} alt="Delet" />
        </button>
      </C.CardActions>
    </C.Container>
  );
}

Card.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  setIsReloadContacts: PropTypes.func.isRequired,
  isReloadContacts: PropTypes.bool.isRequired,
};
