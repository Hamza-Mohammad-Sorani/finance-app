import { Router } from 'next/router';
import React, { useState, useEffect } from 'react';

import { Box, keyframes } from '@mui/material';

// ----------------------------------------------------------------------

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

// ----------------------------------------------------------------------

function RouteLoading() {
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setRouteLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      setRouteLoading(false);
    });
    Router.events.on('routeChangeError', () => {
      setRouteLoading(false);
    });
  }, [setRouteLoading]);

  if (!routeLoading) return null;

  return (
    <Box
      sx={{
        height: '4px',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        bgcolor: 'primary.main',
        zIndex: 10000,
        animation: `${pulse} 2s ease-in-out infinite`,
      }}
    />
  );
}

export default RouteLoading;
