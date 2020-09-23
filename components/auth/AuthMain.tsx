import styled from "styled-components";
import Anchor from "../Anchor";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Copyright from "../Copyright";
import LabelInput from "../LabelInput";

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
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > *:not(:first-child) {
    margin-top: 1.8rem;
  }
`;
const PolicyText = styled.div`
  font-family: "Gmarket Sans";
  align-self: flex-start;
  font-size: 1.1rem;
  line-height: 1.3;
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
        <Form>
          <LabelInput
            type="email"
            label="이메일 Email"
            placeholder="buzzerbeater@google.com"
          />
          <LabelInput
            type="password"
            label="비밀번호 Password"
            placeholder="비밀번호"
          />
          <LabelInput label="이름 Username" placeholder="Buzzer Beater" />
          <Checkbox>
            Buzzer Beater의 최신 소식 및 개발자 포트폴리오 소개를 메일로
            받겠습니다.
          </Checkbox>
          <Checkbox>
            Buzzer Beater&nbsp;<a>서비스 약관</a>에 동의합니다.
          </Checkbox>
          <Button size="large" fullWidth>
            회원가입
          </Button>
        </Form>
        <LoginText>
          이미 계정이 있어요! <a>로그인</a>
        </LoginText>
        <Copyright />
      </Block>
    </Container>
  );
};

export default AuthMain;
