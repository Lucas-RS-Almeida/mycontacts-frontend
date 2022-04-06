import styled from 'styled-components';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(80, 97, 252, 0.9);
  backdrop-filter: blur(5px);
`;

export const ButtonClose = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 20px;
  font-weight: bold;
  background: none;
  color: #FFF;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  button:nth-of-type(3) {
    color: ${({ theme }) => theme.colors.danger.main};
  }

  button {
    background: none;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 8px;
    transition: all .5s;
    color: #FFF;

    &:hover {
      font-size: 25px;
    }
  }
`;

export const Header = styled.div`
  margin-bottom: 24px;

  strong {
    font-size: 32px;
    color: #FFF;
  }
`;
