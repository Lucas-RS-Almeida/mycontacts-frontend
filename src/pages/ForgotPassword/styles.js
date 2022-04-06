import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 32px;

  strong {
    display: block;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.gray[200]};
  }

  div {
    margin-top: 24px;
  }

  form {
    width: 100%;
  }

  a {
    margin-top: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
