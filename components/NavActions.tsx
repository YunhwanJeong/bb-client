import styled from "styled-components";
import { useRouter } from "next/router";
import { useRevokeTokenMutation } from "../generated/graphql";
import { setAccessToken } from "../lib/utils/accessToken";
import SearchBar from "./common/SearchBar";
import Avatar from "./common/Avatar";
import AuthButtonGroup from "./auth/AuthButtonGroup";
import { LoginState, SetLoggedOut } from "../pages/_app";

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

interface NavActionsProps {
  loginState: LoginState;
  setLoggedOut: SetLoggedOut;
}

const NavActions = ({ loginState, setLoggedOut }: NavActionsProps) => {
  const { loading, me } = loginState;
  const router = useRouter();
  const [revokeToken, { client }] = useRevokeTokenMutation();

  const logout = async () => {
    if (me) {
      await revokeToken({
        variables: {
          memberId: me.id,
        },
        update: async (_cache, { data }) => {
          if (data?.revokeToken) {
            setAccessToken("");
            setLoggedOut();
            if (router.pathname !== "/") router.push("/");
            await client.resetStore();
          }
        },
      });
    }
  };

  const setBody = () => {
    if (loading) return null;
    if (me === null) {
      return (
        <>
          <SearchBar />
          <AuthButtonGroup />
        </>
      );
    }
    return (
      <>
        <SearchBar />
        <Avatar onClick={logout} />
      </>
    );
  };

  return <Container>{setBody()}</Container>;
};

export default NavActions;
