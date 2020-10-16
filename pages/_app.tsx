import { AppProps } from "next/app";
import GlobalStyle from "../GlobalStyle";
import { ThemeProvider } from "styled-components";
import { palette } from "../lib/styles";
import { LoginContext } from "../lib/utils/loginContext";
import { isServer } from "../lib/utils/isServer";
import { checkLoginStatus } from "../lib/utils/checkLoginStatus";
import { useEffect, useState } from "react";

type Profile = {
  avatar_url?: string;
};
export type Me = {
  id: string;
  email: string;
  username: string;
  profile?: Profile | null;
};
export interface LoginState {
  loading: Boolean;
  me: Me | null;
}
export type SetLoggedIn = (me: Me) => void;
export type SetLoggedOut = () => void;

export default function App({ Component, pageProps }: AppProps) {
  const [loginState, setLoginState] = useState<LoginState>({
    loading: true,
    me: null,
  });
  const setLoggedIn = (me: Me) =>
    setLoginState({
      loading: false,
      me,
    });
  const setLoggedOut = () =>
    setLoginState({
      loading: false,
      me: null,
    });
  useEffect(() => {
    if (!isServer()) {
      checkLoginStatus(pageProps?.serverAccessToken)
        .then((me) => {
          return setLoginState({
            loading: false,
            me,
          });
        })
        .catch((error) => {
          console.log(error);
          setLoginState({
            loading: false,
            me: null,
          });
        });
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={{ palette }}>
        <LoginContext.Provider
          value={{
            loginState,
            setLoggedIn,
            setLoggedOut,
          }}
        >
          <Component {...pageProps} />
        </LoginContext.Provider>
      </ThemeProvider>
    </>
  );
}
