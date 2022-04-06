import styled from 'styled-components';

export default styled.input`
  width: 100%;
  height: 45px;
  border-radius: 6px;
  padding: 0 16px;
  font-size: 16px;
  border: 2px solid ${({ error, theme }) => (
    error ? theme.colors.danger.main : 'transparent')};
  outline: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);


  &:focus {
    border: 2px solid ${({ error, theme }) => (
    error ? theme.colors.danger.main : theme.colors.primary.main)};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
