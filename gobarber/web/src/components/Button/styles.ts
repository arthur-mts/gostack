import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  border: 0;
  border-radius: 10px;
  padding: 0 16px;

  background: #ff9000;
  width: 100%;

  color: #312e38;

  height: 56px;

  margin-top: 16px;
  font-weight: bold;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
