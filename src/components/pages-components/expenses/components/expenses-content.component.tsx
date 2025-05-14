import type React from 'react';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { useExpenses, itemsPerPage } from '@contexts/expenses.context';
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

import ExpensesMobileView from './expenses-mobile-view.component';
import ExpensesDesktopView from './expenses-desktop-view.component';

// ----------------------------------------------------------------------

const ExpenseForm = dynamic(() => import('../forms/expense.form'), {
  ssr: false,
});

const ExpenseDialogs = dynamic(() => import('./expense-dialogs.component'), {
  ssr: false,
});

// ----------------------------------------------------------------------

function ExpensesContent() {
  const { t } = useTranslation('common');

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const {
    isAdding,
    editItem,
    currentPage,
    statusFilter,
    filteredExpenses,
    addExpense,
    dispatchAdding,
    setCurrentPage,
    handleEditExpense,
    dispatchResetCrudState,
    handleStatusFilterChange,
  } = useExpenses();

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
            {t('expenses')}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={dispatchAdding}
            size={isMd ? 'small' : 'medium'}
            data-cy="add-expense-button"
          >
            {t('addExpense')}
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
                aria-label="expense status filter"
                data-cy="expense-status-filter"
              >
                <MenuItem value="All" data-cy="filter-all">
                  {t('all')}
                </MenuItem>
                <MenuItem value="Pending" data-cy="filter-pending">
                  {t('pending')}
                </MenuItem>
                <MenuItem value="Approved" data-cy="filter-approved">
                  {t('approved')}
                </MenuItem>
                <MenuItem value="Rejected" data-cy="filter-rejected">
                  {t('rejected')}
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
              aria-label="expense status filter"
              size="small"
            >
              <ToggleButton value="All" data-cy="filter-all">
                {t('all')}
              </ToggleButton>
              <ToggleButton value="Pending" data-cy="filter-pending">
                {t('pending')}
              </ToggleButton>
              <ToggleButton value="Approved" data-cy="filter-approved">
                {t('approved')}
              </ToggleButton>
              <ToggleButton value="Rejected" data-cy="filter-rejected">
                {t('rejected')}
              </ToggleButton>
            </ToggleButtonGroup>
          )}

          <Typography variant="body2">
            {t('total')}: {filteredExpenses.length}{' '}
            {filteredExpenses.length === 1 ? t('expense') : t('expensess')}
          </Typography>
        </Box>

        {isMd ? <ExpensesMobileView /> : <ExpensesDesktopView />}

        <PaginationControls
          count={filteredExpenses.length}
          page={currentPage}
          onChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          disabled={filteredExpenses.length <= itemsPerPage}
        />
      </Box>

      <ExpenseForm
        editItem={editItem}
        open={isAdding || !!editItem}
        onSubmit={isAdding ? addExpense : handleEditExpense}
        onClose={dispatchResetCrudState}
      />

      <ExpenseDialogs />
    </>
  );
}

// ----------------------------------------------------------------------

export default ExpensesContent;
