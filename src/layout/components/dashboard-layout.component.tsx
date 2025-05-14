import type React from 'react';
import { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, Tooltip, IconButton } from '@mui/material';

import DashboardHeader from './header/dashboard-header.component';

// ----------------------------------------------------------------------

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useTranslation('layout');

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <DashboardHeader
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: { sm: sidebarOpen ? '240px' : 0 },
          transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        }}
      >
        {children}
      </Box>

      {!sidebarOpen && !isMobile && (
        <Tooltip title="Open sidebar" placement="right">
          <IconButton
            onClick={() => setSidebarOpen(true)}
            sx={{
              position: 'fixed',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': {
                bgcolor: 'action.hover',
              },
              zIndex: 1100,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

export default DashboardLayout;
