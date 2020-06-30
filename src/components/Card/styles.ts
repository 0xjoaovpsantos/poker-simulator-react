import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.span<ContainerProps>`
  border-width: 0px;
  border-style: none;
  margin: 0 10px;

  img {
    transition: all 0.2s;
  }

  ${(props) =>
    props.isFocused &&
    css`
      img {
        /*transform: translateY(-20px);
        transition: all 0.2s;*/
      }
    `}
`;
