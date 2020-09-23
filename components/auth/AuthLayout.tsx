import styled from "styled-components";

const StyledAuthLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <StyledAuthLayout>{children}</StyledAuthLayout>;
};

export default AuthLayout;
