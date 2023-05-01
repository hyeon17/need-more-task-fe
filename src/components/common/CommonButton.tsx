import React from "react";
import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.primary};
`;

function CommonButton() {
  return <StyledButton>CommonButton</StyledButton>;
}

export default CommonButton;
