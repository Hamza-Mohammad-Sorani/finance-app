import Link from 'next/link';
import { useState } from 'react';
import useLinks from '@hooks/use-links.hook';
import { usePathname } from 'next/navigation';
import { useView } from '@contexts/view.context';
import { routeNames } from '@constants/constants';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';

import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Language as LanguageIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import {
  Box,
  List,
  AppBar,
  Button,
  Drawer,
  Toolbar,
  Divider,
  ListItem,
  useTheme,
  Container,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
} from '@mui/material';

// ----------------------------------------------------------------------

function WebsiteHeader() {
  const { t, lang } = useTranslation('layout');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = useLinks();
  const pathname = usePathname();
  const { toggleView } = useView();
  const { palette } = useTheme();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleCloseMobileMenu = () => setMobileOpen(false);
  const toggleLanguage = () => setLanguage(lang === 'ar' ? 'en' : 'ar');

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href={routeNames.home}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: palette.text.primary,
              textDecoration: 'none',
            }}
          >
            {t('finance-app')}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              sx={{ color: palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            href={routeNames.home}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: palette.text.primary,
              textDecoration: 'none',
            }}
          >
            {t('finance-app')}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
            {navItems.map(item => (
              <Button
                key={item.text}
                component={Link}
                href={item.path}
                sx={{
                  my: 2,
                  color: palette.text.primary,
                  display: 'block',
                  fontWeight: pathname === item.path ? 'bold' : 'normal',
                  borderBottom: pathname === item.path ? '2px solid' : 'none',
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={toggleLanguage}
              aria-label="toggle language"
              sx={{ ml: 1, color: palette.text.primary }}
            >
              <LanguageIcon />
              <Typography
                variant="caption"
                sx={{ ml: 0.5, display: { xs: 'none', sm: 'block' } }}
              >
                {lang === 'en' ? 'AR' : 'EN'}
              </Typography>
            </IconButton>

            <Button
              variant="outlined"
              startIcon={<DashboardIcon />}
              onClick={toggleView}
              sx={{ ml: 2, display: { xs: 'none', sm: 'flex' } }}
            >
              {t('switchToDashboard')}
            </Button>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor={lang === 'ar' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleCloseMobileMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: '300px',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={handleCloseMobileMenu}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navItems.map(item => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                selected={pathname === item.path}
                onClick={handleCloseMobileMenu}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <ListItem disablePadding>
            <ListItemButton onClick={toggleView}>
              <ListItemText primary={t('switchToDashboard')} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleLanguage}>
              <ListItemText
                primary={lang === 'en' ? t('arabic') : t('english')}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}

// ----------------------------------------------------------------------

export default WebsiteHeader;
