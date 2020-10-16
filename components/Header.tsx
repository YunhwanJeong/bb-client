import styled from "styled-components";
import { lighten } from "polished";
import Logo from "./common/Logo";
import NavActions from "./NavActions";
import { LoginContext } from "../lib/utils/loginContext";
import { LoginState, SetLoggedOut } from "../pages/_app";

const StyledHeader = styled.header`
  width: 100%;
  height: 88px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${lighten(0.5, "#3c64b1")};
`;
const Block = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 8rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Block>
        <Logo />
        <LoginContext.Consumer>
          {({
            loginState,
            setLoggedOut,
          }: {
            loginState: LoginState;
            setLoggedOut: SetLoggedOut;
          }) => (
            <NavActions loginState={loginState} setLoggedOut={setLoggedOut} />
          )}
        </LoginContext.Consumer>
      </Block>
    </StyledHeader>
  );
};

export default Header;
