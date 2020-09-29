import Head from "next/head";
import { withApollo } from "../lib/withApollo";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Head>
        <title>Buzzer Beater</title>
      </Head>
      <Header />
    </>
  );
};

export default withApollo({ ssr: true })(Home);
