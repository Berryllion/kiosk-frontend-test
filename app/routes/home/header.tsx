import { Heading, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import KioskLogo from "../../assets/kiosk-logo.svg";

const HeaderContainer = styled.header`
  margin: 1.75rem 0;
`;

function Header() {
  return (
    <HeaderContainer>
      <VStack align="flex-start">
        <img src={KioskLogo} alt="Kiosk Logo" width="200" />
        <Heading size="3xl">CSRD Disclosure Requirement Form</Heading>
      </VStack>
    </HeaderContainer>
  );
}

export default Header;
