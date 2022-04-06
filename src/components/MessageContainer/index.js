import PropTypes from 'prop-types';

import { Container } from './styles';

export default function MessageContainer({ text, error }) {
  return (
    <Container error={error}>
      <strong>{text}</strong>
    </Container>
  );
}

MessageContainer.propTypes = {
  text: PropTypes.string.isRequired,
  error: PropTypes.bool,
};

MessageContainer.defaultProps = {
  error: false,
};
