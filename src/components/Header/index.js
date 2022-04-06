import { useState, useContext } from 'react';

import { Container } from './styles';

import { Context } from '../../contexts/AuthContext';

import logo from '../../assets/images/logo.svg';
import menu from '../../assets/images/menu.svg';

import Menu from '../Menu';

export default function Header() {
  const [modal, setModal] = useState(false);

  const { token } = useContext(Context);

  function handleOpenModal() {
    setModal(true);
  }

  function handleCloseModal() {
    setModal(false);
  }

  return (
    <Container justify={
      token
        ? 'space-between'
        : 'center'
    }
    >
      {(modal && token) && (
        <Menu
          onCloseModal={handleCloseModal}
        />
      )}
      <img src={logo} alt="My Contacts" />

      {token && (
        <button
          type="button"
          onClick={handleOpenModal}
        >
          <img src={menu} alt="Menu" />
        </button>
      )}
    </Container>
  );
}
