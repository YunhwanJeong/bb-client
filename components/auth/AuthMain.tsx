import styled from "styled-components";
import Link from "next/link";
import Copyright from "../Copyright";
import AuthForm from "./AuthForm";
import AuthSocialButton from "./AuthSocialButton";
import ForgotPasswordForm from "./ForgotPasswordForm";

const pages = {
  signup: {
    header: "지금 바로 Buzzer Beater에 가입하세요!",
    linkText: "이미 계정이 있어요! ",
    href: "/login",
  },
  login: {
    header: "Buzzer Beater 로그인",
    linkText: "신규 사용자예요! ",
    href: "/signup",
  },
};

const Container = styled.section`
  height: 100%;
  flex: 17;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 7.9rem 0;
  & > *:not(:first-child) {
    margin-top: 3.9rem;
  }
`;
const Header = styled.h1`
  font-size: 2.5rem;
  line-height: 0.64;
  font-family: "Black Han Sans", sans-serif;
  align-self: flex-start;
`;
const Divider = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Hr = styled.hr`
  width: 128px;
  align-self: flex-end;
  height: 0;
  border: 0;
  border-top: 1px solid black;
  margin: 1em 0;
  padding: 0;
`;
const DividerText = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;
const LinkText = styled.div`
  font-size: 1.2rem;
  line-height: 1.3;
  a {
    font-weight: 700;
    color: ${({ theme }) => theme.palette.blue};
    text-decoration-line: underline;
  }
`;

const AuthMain = ({ page }: { page: string }) => {
  return (
    <Container>
      <Block>
        {page === "forgot-password" ? (
          <ForgotPasswordForm />
        ) : (
          <>
            <Header>{pages[page].header}</Header>
            <AuthSocialButton provider="google" fullWidth>
              Google로 가입하기
            </AuthSocialButton>
            <Divider>
              <Hr />
              <DividerText>또는</DividerText>
              <Hr />
            </Divider>
            <AuthForm page={page} />
            <LinkText>
              {pages[page].linkText}
              <Link href={pages[page].href}>
                <a>{page === "signup" ? "로그인" : "회원가입"}</a>
              </Link>
            </LinkText>
          </>
        )}
        <Copyright />
      </Block>
    </Container>
  );
};

export default AuthMain;
