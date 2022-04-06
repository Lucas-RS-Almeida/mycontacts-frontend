import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import { Context } from '../../contexts/AuthContext';

import * as C from './styles';

import Modal from '../Modal';

import UserService from '../../services/UserService';

export default function Menu({ onCloseModal }) {
  const [isModal, setIsModal] = useState(false);

  const { user, token } = useContext(Context);

  const navigate = useNavigate();

  function handleLogout() {
    navigate('/');
    localStorage.clear();
    window.location.reload();
  }

  function handleTogglePage(pageName) {
    onCloseModal();
    navigate(`/${pageName}/${user.id}`);
  }

  async function handleDeleteUser() {
    try {
      await UserService.delete(user.id, token);

      handleLogout();
    } catch (error) {
      console.log(error.message);
    }
  }

  return ReactDOM.createPortal(
    <C.Background>
      {isModal && (
        <Modal
          text="Deseja mesmo excluir seu usuário?"
          description="Você irá perder todos os seus contatos cadastrados!"
          textButton="Excluir"
          danger={isModal}
          setIsModal={setIsModal}
          onFunction={handleDeleteUser}
        />
      )}
      <C.ButtonClose
        type="button"
        onClick={onCloseModal}
      >
        Fechar
      </C.ButtonClose>
      <C.Container>
        <button
          type="button"
          onClick={() => handleTogglePage('changeemail')}
        >
          Editar e-mail
        </button>
        <button
          type="button"
          onClick={() => handleTogglePage('changepassword')}
        >
          Trocar senha
        </button>
        <button
          type="button"
          onClick={() => setIsModal(true)}
        >
          Deletar usuário
        </button>
        <button
          type="button"
          onClick={handleLogout}
        >
          Sair
        </button>
      </C.Container>
    </C.Background>,
    document.getElementById('menu-root'),
  );
}

Menu.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
