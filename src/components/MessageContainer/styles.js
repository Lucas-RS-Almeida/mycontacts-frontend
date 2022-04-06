import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  margin-top: 24px;
  border-radius: 6px;
  background: ${({ theme, error }) => (error
    ? theme.colors.danger.light : theme.colors.primary.light)};

  strong {
    margin: 0;
    color: #FFF;
  }
`;
