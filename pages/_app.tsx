import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Container } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container maxWidth="sm">
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
