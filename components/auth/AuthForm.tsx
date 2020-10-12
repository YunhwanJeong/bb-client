import styled from "styled-components";
import Link from "next/link";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import LabelInput from "../common/LabelInput";
import {
  MeQuery,
  MeDocument,
  useLoginMutation,
  useRegisterMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import { setAccessToken } from "../../lib/accessToken";

const StyledAuthForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > *:not(:first-child) {
    margin-top: 1.8rem;
  }
`;
const ForgotPasswordLink = styled.a`
  align-self: flex-start;
  font-size: 1.2rem;
  line-height: 1.3;
  font-weight: 200;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.gray6};
`;

const AuthForm = ({ page }: { page: string }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    let isRegistered = true;
    e.preventDefault();

    if (page === "signup") {
      const registerResponse = await register({
        variables: { email, password, username },
      });
      if (!registerResponse || !registerResponse.data) {
        isRegistered = false;
      }
    }

    if (isRegistered) {
      const loginResponse = await login({
        variables: { email, password },
        update: (cache, { data }) => {
          if (!data) {
            return;
          }
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.member,
            },
          });
        },
      });
      if (loginResponse && loginResponse.data) {
        setAccessToken(loginResponse.data.login.accessToken);
        router.push("/");
      }
    }
  };

  return (
    <StyledAuthForm onSubmit={handleSubmit}>
      <LabelInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        label="이메일 Email"
        placeholder="buzzerbeater@google.com"
      />
      <LabelInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        label="비밀번호 Password"
        placeholder="비밀번호"
      />
      {page === "signup" ? (
        <>
          <LabelInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="이름 Username"
            placeholder="Buzzer Beater"
          />
          <Checkbox>
            Buzzer Beater의 최신 소식 및 개발자 포트폴리오 소개를 메일로
            받겠습니다.
          </Checkbox>
          <Checkbox>
            Buzzer Beater&nbsp;<a>서비스 약관</a>에 동의합니다.
          </Checkbox>
        </>
      ) : null}
      {page === "login" ? (
        <Link href="/forgot-password">
          <ForgotPasswordLink>계정을 잊으셨나요?</ForgotPasswordLink>
        </Link>
      ) : null}
      <Button size="large" fullWidth>
        {page === "signup" ? "회원가입" : "로그인"}
      </Button>
    </StyledAuthForm>
  );
};

export default AuthForm;
