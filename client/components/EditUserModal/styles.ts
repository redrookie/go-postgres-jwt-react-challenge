import styled from "styled-components";

export const EditUserWrapper = styled.div`
  opacity: 0;
  visibility: hidden;
  background: cornflowerblue;
  padding: 20px;
  min-width: 300px;
  text-align: center;
  width: fit-content;
  border: 3px solid black;
  border-radius: 10px;
  transition: visibility 0s linear 0.3s, opacity 0.3s linear;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.show {
    opacity: 1;
    visibility: unset;
    transition: visibility 0s linear 0s, opacity 0.3s linear;
  }
`;

export const EditUserText = styled.p``;

export const EditUserButtonWrapper = styled.div``;

export const EditUserButton = styled.button`
  width: 100%;
  &.back {
    margin-bottom: 10px;
  }
`;

export const InputField = styled.input`
  display: block;
  margin: 0px auto 10px auto;
  height: 30px;
`;
