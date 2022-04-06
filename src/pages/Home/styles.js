import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const InputSearch = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);

  input {
    width: 100%;
    height: 100%;
    box-shadow: none;
    border-radius: 25px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify};
  margin-top: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  strong {
    font-size: 24px;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    transition: all .2s ease-in;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #FFF;
    }
  }
`;

export const ListHeader = styled.div`
  button {
    display: flex;
    align-items: center;
    margin-top: 16px;
    background: none;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
      transition: all .2s;
      margin-left: 8px;
      transform: rotate(${({ orderBy }) => (orderBy === 'asc' ? '180deg' : '0deg')});
    }
  }
`;

export const ListContacts = styled.div`
  margin-top: 16px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  gap: 24px;

  .details {
    strong {
      color: ${({ theme }) => theme.colors.danger.main};
    }

    button {
      margin-top: 16px;
    }
  }
`;

export const SearchNotFoundContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-top: 24px;

  span {
    word-break: break-word;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const EmptyListContainer = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    margin-top: 8px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
