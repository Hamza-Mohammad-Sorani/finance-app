/* eslint-disable no-nested-ternary */
import Link from 'next/link';
import { useState } from 'react';
import useLinks from '@hooks/use-links.hook';
import { usePathname } from 'next/navigation';
import { useView } from '@contexts/view.context';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';

import {
  Web as WebIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Language as LanguageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import {
  Box,
  List,
  AppBar,
  Button,
  Drawer,
  Toolbar,
  Divider,
  Tooltip,
  ListItem,
  useTheme,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  ListItemButton,
} from '@mui/material';

// ----------------------------------------------------------------------

const drawerWidth = 240;

// ----------------------------------------------------------------------

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

// ----------------------------------------------------------------------

function DashboardHeader({ sidebarOpen, toggleSidebar }: DashboardHeaderProps) {
  const { t, lang } = useTranslation('layout');

  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useLinks();
  const pathname = usePathname();
  const { palette, breakpoints } = useTheme();

  const { toggleView } = useView();

  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const toggleLanguage = () => setLanguage(lang === 'ar' ? 'en' : 'ar');

  const drawer = (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
        }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ p: 1 }}>
          {t('finance-app')}
        </Typography>
        {isMobile ? (
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={toggleSidebar}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            {lang === 'en' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}
      </Box>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              onClick={isMobile ? handleDrawerToggle : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isMobile && (
        <>
          <Divider sx={{ mt: 2 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleLanguage}>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText
                  primary={lang === 'en' ? t('arabic') : t('english')}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleView}>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText primary={t('switchToWebsite')} />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            aria-label={sidebarOpen ? 'close drawer' : 'open drawer'}
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2, display: { xs: 'none', sm: 'flex' } }}
          >
            {sidebarOpen ? (
              lang === 'en' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )
            ) : (
              <MenuIcon />
            )}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: palette.text.primary }}
          >
            {t('finance-app')}
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <Tooltip title={lang === 'en' ? t('arabic') : t('english')}>
              <IconButton
                onClick={toggleLanguage}
                aria-label="toggle language"
                sx={{ mx: 1, display: { xs: 'none', sm: 'flex' } }}
              >
                <LanguageIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={t('switchToWebsite')}>
              <Button
                variant="outlined"
                startIcon={<WebIcon />}
                onClick={toggleView}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                {t('switchToWebsite')}
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '80%',
            maxWidth: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="persistent"
        open={sidebarOpen}
        anchor={lang === 'ar' ? 'right' : 'left'}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            top: '64px', // Height of AppBar
            height: 'calc(100% - 64px)',
            ...(lang === 'ar' && {
              left: 0,
              right: 'auto',
            }),
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

export default DashboardHeader;
