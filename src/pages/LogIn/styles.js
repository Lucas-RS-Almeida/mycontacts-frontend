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
  justify-content: space-between;
  margin-top: 16px;

  a {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  span {
    a {
      margin-left: 6px;
    }
  }
`;
