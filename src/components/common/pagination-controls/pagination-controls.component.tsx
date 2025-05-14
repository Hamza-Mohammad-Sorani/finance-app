import type React from 'react';
import useTranslation from 'next-translate/useTranslation';

import {
  Box,
  useTheme,
  Pagination,
  useMediaQuery,
  PaginationItem,
} from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  count: number;
  page: number;
  onChange: (page: number) => void;
  itemsPerPage?: number;
  disabled?: boolean;
};

// ----------------------------------------------------------------------

function PaginationControls({
  count,
  page,
  onChange,
  itemsPerPage = 10,
  disabled,
}: Props) {
  const { lang } = useTranslation();

  const totalPages = Math.ceil(count / itemsPerPage);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        showFirstButton={!isMobile}
        showLastButton={!isMobile}
        size={isMobile ? 'small' : 'medium'}
        siblingCount={isMobile ? 0 : 1}
        disabled={disabled}
        renderItem={item => (
          <PaginationItem
            {...item}
            slotProps={{
              first: {
                sx: {
                  transform: lang === 'ar' ? 'rotate(180deg)' : undefined,
                },
              },
              last: {
                sx: {
                  transform: lang === 'ar' ? 'rotate(180deg)' : undefined,
                },
              },
              next: {
                sx: {
                  transform: lang === 'ar' ? 'rotate(180deg)' : undefined,
                },
              },
              previous: {
                sx: {
                  transform: lang === 'ar' ? 'rotate(180deg)' : undefined,
                },
              },
            }}
          />
        )}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

export default PaginationControls;
