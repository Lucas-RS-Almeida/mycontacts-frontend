import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;

  form {
    margin-top: 24px;
  }
`;

export const FormHeader = styled.header`
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const FormFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;

  span {
    a {
    color: ${({ theme }) => theme.colors.primary.main};
      margin-left: 6px;
    }
  }
`;
