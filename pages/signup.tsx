import Head from "next/head";
import AuthLayout from "../components/auth/AuthLayout";
import AuthMain from "../components/auth/AuthMain";
import AuthSide from "../components/auth/AuthSide";

const SignUp = (props) => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <AuthLayout>
        <AuthMain page="signup" />
        <AuthSide page="signup" />
      </AuthLayout>
    </>
  );
};

export default SignUp;
