import Head from "next/head";
import styled from "styled-components";
import { useUsersQuery } from "../generated/graphql";

const Title = styled.h1`
  font-size: 50px;
  color: red;
`;

const Home = () => {
  const { data, loading } = useUsersQuery();
  if (!loading) console.log(data);

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
