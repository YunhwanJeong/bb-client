import Head from "next/head";
import AuthLayout from "../components/auth/AuthLayout";
import AuthMain from "../components/auth/AuthMain";
import AuthSide from "../components/auth/AuthSide";
import { withApollo } from "../lib/apollo/withApollo";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <AuthLayout>
        <AuthMain page="login" />
        <AuthSide />
      </AuthLayout>
    </>
  );
};

export default withApollo({ ssr: false })(Login);
