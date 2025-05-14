import type React from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Box, Stack, Container } from '@mui/material';

import WebsiteHeader from './header/website-header.component';

// ----------------------------------------------------------------------

function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const { t, lang } = useTranslation('layout');

  return (
    <Stack minHeight="100vh" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <WebsiteHeader />
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center' }}>
            © {new Date().getFullYear()} {t('finance-app')}
          </Box>
        </Container>
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

export default WebsiteLayout;
