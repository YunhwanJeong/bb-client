import { AppProps } from "next/app";
import GlobalStyle from "../GlobalStyle";
import { ThemeProvider } from "styled-components";
import { palette } from "../lib/styles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={{ palette }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
