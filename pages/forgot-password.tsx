import Head from "next/head";
import AuthLayout from "../components/auth/AuthLayout";
import AuthMain from "../components/auth/AuthMain";
import AuthSide from "../components/auth/AuthSide";
import { withApollo } from "../lib/apollo/withApollo";

const ForgotPassword = () => {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <AuthLayout>
        <AuthMain page="forgot-password" />
        <AuthSide />
      </AuthLayout>
    </>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
