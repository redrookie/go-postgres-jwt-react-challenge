import styled from "styled-components";

export const CustomerInfoWrapper = styled.div`
  width: fit-content;
  background: cornflowerblue;
  padding: 20px;
`;

export const CustomerInfoText = styled.p``;

export const CustomerButtonWrapper = styled.div``;

export const CustomerButton = styled.button`
  width: 100%;
  &:hover {
    background-color: darkgreen;
  }
  &.back {
    margin-bottom: 10px;
  }
`;

export const InputField = styled.input`
  display: block;
  margin-bottom: 10px;
  height: 30px;
`;
