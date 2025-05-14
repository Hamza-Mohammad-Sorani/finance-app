import type React from 'react';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { useCards, itemsPerPage } from '@contexts/cards.context';
import PaginationControls from '@components/common/pagination-controls/pagination-controls.component';

import { Add as AddIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Select,
  useTheme,
  MenuItem,
  Typography,
  FormControl,
  ToggleButton,
  useMediaQuery,
  ToggleButtonGroup,
} from '@mui/material';

import CardsMobileView from './card-mobile-view.component';
import CardsDesktopView from './card-desktop-view.component';

// ----------------------------------------------------------------------

const CardForm = dynamic(() => import('../forms/card.form'), {
  ssr: false,
});

const CardDialogs = dynamic(() => import('./card-dialogs.component'), {
  ssr: false,
});

// ----------------------------------------------------------------------

function CardsContent() {
  const { t } = useTranslation('common');

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const {
    isAdding,
    editItem,
    currentPage,
    statusFilter,
    filteredCards,
    addCard,
    dispatchAdding,
    setCurrentPage,
    handleEditCard,
    dispatchResetCrudState,
    handleStatusFilterChange,
  } = useCards();

  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h1">
            {t('cards')}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={dispatchAdding}
            size={isMd ? 'small' : 'medium'}
            data-cy="add-card-button"
          >
            {t('addCard')}
          </Button>
        </Box>

        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {isMd ? (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={statusFilter || 'All'}
                onChange={e =>
                  handleStatusFilterChange(
                    e.target.value === 'All' ? null : e.target.value,
                  )
                }
                aria-label="card status filter"
                data-cy="card-status-filter"
              >
                <MenuItem value="All" data-cy="filter-all">
                  {t('all')}
                </MenuItem>
                <MenuItem value="Active" data-cy="filter-active">
                  {t('active')}
                </MenuItem>
                <MenuItem value="Inactive" data-cy="filter-inactive">
                  {t('inactive')}
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            <ToggleButtonGroup
              value={statusFilter || 'All'}
              exclusive
              onChange={(_, newStatus) =>
                handleStatusFilterChange(newStatus === 'All' ? null : newStatus)
              }
              aria-label="card status filter"
              size="small"
            >
              <ToggleButton value="All" data-cy="filter-all">
                {t('all')}
              </ToggleButton>
              <ToggleButton value="Active" data-cy="filter-active">
                {t('active')}
              </ToggleButton>
              <ToggleButton value="Inactive" data-cy="filter-inactive">
                {t('inactive')}
              </ToggleButton>
            </ToggleButtonGroup>
          )}

          <Typography variant="body2">
            {t('total')}: {filteredCards.length}{' '}
            {filteredCards.length === 1 ? t('card') : t('cardss')}
          </Typography>
        </Box>

        {isMd ? <CardsMobileView /> : <CardsDesktopView />}

        <PaginationControls
          count={filteredCards.length}
          page={currentPage}
          onChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          disabled={filteredCards.length <= itemsPerPage}
        />
      </Box>

      <CardForm
        editItem={editItem}
        open={isAdding || !!editItem}
        onSubmit={isAdding ? addCard : handleEditCard}
        onClose={dispatchResetCrudState}
      />

      <CardDialogs />
    </>
  );
}

// ----------------------------------------------------------------------

export default CardsContent;
