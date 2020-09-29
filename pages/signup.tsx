import Head from "next/head";
import AuthLayout from "../components/auth/AuthLayout";
import AuthMain from "../components/auth/AuthMain";
import AuthSide from "../components/auth/AuthSide";
import { withApollo } from "../lib/withApollo";

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <AuthLayout>
        <AuthMain page="signup" />
        <AuthSide />
      </AuthLayout>
    </>
  );
};

export default withApollo({ ssr: false })(SignUp);
