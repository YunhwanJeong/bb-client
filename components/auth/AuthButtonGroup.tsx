import Link from "next/link";
import styled from "styled-components";
import AnchorButton from "../common/AnchorButton";
import AuthSocialButton from "./AuthSocialButton";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.4rem;
`;

const AuthButtonGroup = () => {
  return (
    <Container>
      <AuthSocialButton provider="google" />
      <Link href="/login" passHref>
        <AnchorButton color="gray7" outline={false}>
          Login
        </AnchorButton>
      </Link>
      <Link href="/signup" passHref>
        <AnchorButton>Sign Up</AnchorButton>
      </Link>
    </Container>
  );
};

export default AuthButtonGroup;
