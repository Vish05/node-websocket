import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { AuthContext } from "../context/authContext";
import { useAuth } from "../hooks/auth-hook";
import Head from "next/head";
import { Protected } from "../components/Protected";

function MyApp({ Component, pageProps }: AppProps) {
  const values = useAuth();
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>PointIt</title>
        <meta
          name="description"
          content="A work item estimation tool for agile development teams. Cast votes for story points with team members in real-time."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#333333" />
        <meta name="theme-color" content="#333333" />
      </Head>

      <AuthContext.Provider value={values}>
        <Protected>
          <Component {...pageProps} />
        </Protected>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
