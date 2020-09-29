import styled from "styled-components";
import { useState } from "react";
import Button from "../Button";

const StyledForgotPasswordForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > *:not(:first-child) {
    margin-top: 1.8rem;
  }
  p {
    align-self: flex-start;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.3;
    color: ${({ theme }) => theme.palette.gray7};
  }
  input {
    width: 100%;
    padding: 1.5rem 1.1rem;
    border-radius: 6px;
    border: 0.7px solid #c4c4c4;
  }
`;

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("revoke token and reset password here");
  };
  return (
    <StyledForgotPasswordForm onSubmit={handleSubmit}>
      <p>Buzzer Beater 가입 시 등록하신 이메일 주소를 입력해 주세요.</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="buzzerbeater@google.com"
      />
      <Button size="large" fullWidth>
        보내기
      </Button>
    </StyledForgotPasswordForm>
  );
};

export default ForgotPasswordForm;
