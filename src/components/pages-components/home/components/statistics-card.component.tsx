import React from 'react';

import { OverridableComponent } from '@mui/material/OverridableComponent';
import {
  Box,
  Paper,
  useTheme,
  Typography,
  useMediaQuery,
  SvgIconTypeMap,
} from '@mui/material';

// ----------------------------------------------------------------------

export type IStatisticsCardProps = {
  title: string;
  bgcolor: string;
  total: number | string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  end?: string;
};

// ----------------------------------------------------------------------

function StatisticsCard({
  title,
  total,
  Icon,
  end,
  bgcolor,
}: IStatisticsCardProps) {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: { xs: 120, sm: 140 },
        bgcolor,
        color: 'primary.contrastText',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="h2" variant="h6" noWrap>
          {title}
        </Typography>
        <Icon />
      </Box>
      <Typography
        component="p"
        variant={isMobile ? 'h5' : 'h4'}
        sx={{ my: 'auto' }}
      >
        {total}
      </Typography>
      <Typography variant="body2" sx={{ alignSelf: 'flex-end' }}>
        {end}
      </Typography>
    </Paper>
  );
}

// ----------------------------------------------------------------------

export default StatisticsCard;
