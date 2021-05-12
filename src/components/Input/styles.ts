import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 312;
  height: 40;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  border-bottom-width: 2;
  border-bottom-color:#232729;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${(props => props.isErrored && css`border-bottom-color:#fa7592;`)}

`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 14px;
  font-family: 'Lato_700Bold';
`;


export const TextError = styled.Text`
  font-family: 'Lato_400Regular';
  font-size: 14px;
  color: #fa7592;
  align-items: center;
  justify-content: center;
  margin-top: 5;
  margin-bottom: 5;
`;
