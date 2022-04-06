import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import { Overlay, Container, Footer } from './styles';

import Button from '../Button';

export default function Modal({
  text, textButton, danger, setIsModal, onFunction, description,
}) {
  function handleCloseModal() {
    setIsModal(false);
  }

  async function handleAccepetFunction() {
    await onFunction();

    setIsModal(false);
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <header>
          <h1>{ text }</h1>
          <strong>{description}</strong>
        </header>

        <Footer danger={danger}>
          <button
            type="button"
            onClick={handleCloseModal}
          >
            <span>Cancelar</span>
          </button>
          <Button
            type="button"
            onClick={handleAccepetFunction}
          >
            {textButton}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  text: PropTypes.string.isRequired,
  textButton: PropTypes.string,
  danger: PropTypes.bool,
  setIsModal: PropTypes.func.isRequired,
  onFunction: PropTypes.func.isRequired,
  description: PropTypes.string,
};

Modal.defaultProps = {
  textButton: 'Deletar',
  danger: false,
  description: null,
};
