import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Anchor from "../components/Anchor";
import { withApollo } from "../lib/withApollo";

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

const Home = () => {
  return (
    <>
      <Head>
        <title>Buzzer Beater</title>
      </Head>
      <AppBlock>
        <Anchor color="gray7" outline={false}>
          Sign In
        </Anchor>
        <Link href="/signup" passHref>
          <Anchor>Sign Up</Anchor>
        </Link>
      </AppBlock>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
