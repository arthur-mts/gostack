import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  color: #666360;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  display: flex;
  align-items: center;
  width: 100%;


  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}


  ${(props) =>
    props.isFocused &&
    css`
      transition: border-color 0.2s ease-in;
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}



  input {
    color: #f4ede8;
    background: transparent;
    flex: 1;
    border: none;
    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }

  & + div {
    margin-top: 8px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  svg {
    margin: 0px;
  }
  margin-left: 16px;

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
