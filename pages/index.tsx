import Head from "next/head";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 50px;
  color: red;
`;

const Home = () => {
  return (
    <>
      <Head>
        <title>Buzzer Beater</title>
      </Head>
      <Title>hello world</Title>
    </>
  );
};

export default Home;
