import type React from 'react';
import { useExpenses } from '@contexts/expenses.context';
import useTranslation from 'next-translate/useTranslation';
import { ExpenseStatus } from '@apis/expense/expense.type';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Chip,
  Paper,
  Table,
  Stack,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableContainer,
} from '@mui/material';

// ----------------------------------------------------------------------

export const getExpenseStatusColor = (status: ExpenseStatus) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Rejected':
      return 'error';
    default:
      return 'default';
  }
};

// ----------------------------------------------------------------------

function ExpensesDesktopView() {
  const { t, lang } = useTranslation('common');

  const {
    paginatedExpenses,
    setRejectDialog,
    dispatchEditing,
    dispatchDeleting,
    setApproveDialog,
  } = useExpenses();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('date')}</TableCell>
            <TableCell>{t('description')}</TableCell>
            <TableCell align="right">{t('amount')}</TableCell>
            <TableCell>{t('status')}</TableCell>
            <TableCell align="right">{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedExpenses.length > 0 ? (
            paginatedExpenses.map(expense => (
              <TableRow key={expense.id}>
                <TableCell>
                  {new Date(expense.createdAt).toLocaleDateString(
                    lang === 'ar' ? 'ar-SA' : 'en-US',
                  )}
                </TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell align="right">
                  {lang === 'ar'
                    ? `${expense.amount.toFixed(2)} $`
                    : `$${expense.amount.toFixed(2)}`}
                </TableCell>
                <TableCell>
                  <Chip
                    label={t(expense.status)}
                    color={getExpenseStatusColor(expense.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    {expense.status === 'Pending' && (
                      <>
                        <Tooltip title={t('approve')}>
                          <IconButton
                            size="small"
                            onClick={() => setApproveDialog(expense.id)}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('reject')}>
                          <IconButton
                            size="small"
                            onClick={() => setRejectDialog(expense.id)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title={t('edit')}>
                      <IconButton
                        size="small"
                        onClick={() => dispatchEditing(expense)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('delete')}>
                      <IconButton
                        size="small"
                        onClick={() => dispatchDeleting(expense.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                {t('noData')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

export default ExpensesDesktopView;
