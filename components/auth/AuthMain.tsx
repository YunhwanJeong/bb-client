import styled from "styled-components";
import Anchor from "../Anchor";
import Copyright from "../Copyright";
import RegisterForm from "../RegisterForm";

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
const LoginText = styled.div`
  font-size: 1.2rem;
  line-height: 1.3;
`;

const AuthMain = ({ page }: { page: string }) => {
  return (
    <Container>
      <Block>
        <Header>지금 바로 Buzzer Beater에 가입하세요!</Header>
        <Anchor color="gray7" outline fullWidth>
          Google로 가입하기
        </Anchor>
        <Divider>
          <Hr />
          <DividerText>또는</DividerText>
          <Hr />
        </Divider>
        <RegisterForm />
        <LoginText>
          이미 계정이 있어요! <a>로그인</a>
        </LoginText>
        <Copyright />
      </Block>
    </Container>
  );
};

export default AuthMain;
