import Head from "next/head";
import styled from "styled-components";
import Button from "../components/Button";

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
        <Button color="gray" outline={false}>
          Sign In
        </Button>
        <Button>Sign Up</Button>
      </AppBlock>
    </>
  );
};

export default Home;
