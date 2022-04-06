import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);

  & + & {
    margin-top: 16px;
  }
`;

export const CardInformations = styled.div`
  .card-name {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;

    small {
      text-transform: uppercase;
      border-radius: 6px;
      font-weight: bold;
      padding: 4px 6px;
      background: ${({ theme }) => theme.colors.primary.lighter};
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  span {
    display: block;
    max-width: 400px;
    word-break: break-word;
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  button {
    background: none;
  }
`;
