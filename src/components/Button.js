import styled from 'styled-components';

export default styled.button`
  width: 100%;
  height: 45px;
  margin-top: 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  transition: all .2s;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);
  background: ${({ theme }) => theme.colors.primary.main};
  color: #FFF;

  &[disabled] {
    cursor: initial;
    background: ${({ theme }) => theme.colors.gray[200]};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }
`;
