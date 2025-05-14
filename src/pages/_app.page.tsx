import { AppProps } from 'next/app';
import { inter, cairo } from '@theme/fonts';
import createTheme from '@theme/create-theme';
import { ViewProvider } from '@contexts/view.context';
import useTranslation from 'next-translate/useTranslation';
import createEmotionCache from '@utils/create-emotion-cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import RootLayoutContent from '@layout/root-layout-content.component';

import CssBaseline from '@mui/material/CssBaseline';

import '../../public/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { lang } = useTranslation();
  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  const clientSideEmotionCache = createEmotionCache(lang);
  const theme = createTheme(direction);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <ViewProvider>
          <CssBaseline />
          <main className={`${inter.variable} ${cairo.variable}`}>
            <RootLayoutContent>
              <Component {...pageProps} />
            </RootLayoutContent>
          </main>
        </ViewProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
