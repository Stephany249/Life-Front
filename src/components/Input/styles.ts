import styled, { css } from 'styled-components/native';


export const Container = styled.View`
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

`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 14px;
  font-family: 'Lato_700Bold';
`;
