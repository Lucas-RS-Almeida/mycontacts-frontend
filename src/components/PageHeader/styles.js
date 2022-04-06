import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 36px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 8px;

    img {
      transform: rotate(-90deg);
    }

    span {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
