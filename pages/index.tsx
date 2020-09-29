import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Anchor from "../components/Anchor";
import AuthSocialButton from "../components/auth/AuthSocialButton";
import { withApollo } from "../lib/withApollo";

const AppBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
  background-color: lightblue;
`;

const Home = () => {
  return (
    <>
      <Head>
        <title>Buzzer Beater</title>
      </Head>
      <AppBlock>
        <AuthSocialButton provider="google" />
        <Link href="/login" passHref>
          <Anchor color="gray7" outline={false}>
            Login
          </Anchor>
        </Link>
        <Link href="/signup" passHref>
          <Anchor>Sign Up</Anchor>
        </Link>
      </AppBlock>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
