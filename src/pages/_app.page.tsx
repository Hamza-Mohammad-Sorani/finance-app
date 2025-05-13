import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { CacheProvider } from "@emotion/react";
import { appWithTranslation } from "next-i18next";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import getTheme from "../theme/theme";
import createEmotionCache from "../utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache(false);

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const theme = getTheme(direction);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);
