import ReactDOM from 'react-dom';

import * as C from './styles';

export default function Lodaer({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <C.Overlay>
      <div className="loader" />
    </C.Overlay>,
    document.getElementById('loader-root'),
  );
}
