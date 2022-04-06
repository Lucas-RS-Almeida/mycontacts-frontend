import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify};
  margin-top: 48px;

  button {
    background: none;

    img {
      max-width: 30px;
    }
  }
`;
