import styled from "styled-components";
import Button from "./Button";
import Checkbox from "./Checkbox";
import LabelInput from "./LabelInput";
import {
  MeQuery,
  MeDocument,
  useLoginMutation,
  useRegisterMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import { setAccessToken } from "../lib/accessToken";

const StyledRegisterForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > *:not(:first-child) {
    margin-top: 1.8rem;
  }
`;

const RegisterForm = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const registerResponse = await register({
      variables: { email, password, username },
    });
    if (registerResponse && registerResponse.data) {
      const loginResponse = await login({
        variables: { email, password },
        update: (cache, { data }) => {
          if (!data) {
            return;
          }
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user,
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
    <StyledRegisterForm onSubmit={handleRegister}>
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
      <LabelInput
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="이름 Username"
        placeholder="Buzzer Beater"
      />
      <Checkbox>
        Buzzer Beater의 최신 소식 및 개발자 포트폴리오 소개를 메일로 받겠습니다.
      </Checkbox>
      <Checkbox>
        Buzzer Beater&nbsp;<a>서비스 약관</a>에 동의합니다.
      </Checkbox>
      <Button size="large" fullWidth>
        회원가입
      </Button>
    </StyledRegisterForm>
  );
};

export default RegisterForm;
