import styled from 'styled-components';

export const Overlay = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
`;

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px 24px;
  border-radius: 6px;
  background: #FFF;

  h1 {
    color: ${({ danger, theme }) => danger && theme.colors.danger.main};
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 16px;

  button:nth-of-type(1) {
    font-weight: bold;
    font-size: 18px;
    background: none;
    color: ${({ theme }) => theme.colors.gray[200]};
  }

  button:nth-of-type(2) {
    max-width: 110px;
    background: ${({ danger, theme }) => danger && theme.colors.danger.main};
  }
`;
