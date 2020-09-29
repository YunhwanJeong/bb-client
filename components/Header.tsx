import styled from "styled-components";
import Link from "next/link";
import Anchor from "../components/Anchor";
import AuthSocialButton from "../components/auth/AuthSocialButton";
import { lighten } from "polished";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const StyledHeader = styled.header`
  width: 100%;
  height: 88px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${lighten(0.5, "#3c64b1")};
`;
const Block = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 8rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Block>
        <Logo />
        <SearchBar />
        <AuthSocialButton provider="google" />
        <Link href="/login" passHref>
          <Anchor color="gray7" outline={false}>
            Login
          </Anchor>
        </Link>
        <Link href="/signup" passHref>
          <Anchor>Sign Up</Anchor>
        </Link>
      </Block>
    </StyledHeader>
  );
};

export default Header;
