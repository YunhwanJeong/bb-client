import styled from "styled-components";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
import {
  MeDocument,
  MeQuery,
  useRevokeTokenMutation,
} from "../generated/graphql";
import { isServer } from "../lib/isServer";
import { setAccessToken } from "../lib/accessToken";
import SearchBar from "./common/SearchBar";
import Avatar from "./common/Avatar";
import AuthButtonGroup from "./auth/AuthButtonGroup";

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavActions = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery({
    skip: isServer(),
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  const [revokeToken, { client }] = useRevokeTokenMutation();
  const logout = async () => {
    const currentMember = client.cache.readQuery<MeQuery>({
      query: MeDocument,
    });
    if (currentMember) {
      await revokeToken({
        variables: {
          memberId: currentMember.me.id,
        },
        update: async (_cache, { data }) => {
          if (data?.revokeToken) {
            setAccessToken("");
            if (router.pathname !== "/") router.push("/");
            await client.resetStore();
          }
        },
      });
    }
  };
  if (loading) return null;

  return (
    <Container>
      <SearchBar />
      {data?.me ? <Avatar onClick={logout} /> : <AuthButtonGroup />}
    </Container>
  );
};

export default NavActions;
