import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  & + & {
    margin-top: 16px;
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
  }
`;
