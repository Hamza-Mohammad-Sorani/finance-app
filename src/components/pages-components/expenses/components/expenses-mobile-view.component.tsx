import type React from 'react';
import { useExpenses } from '@contexts/expenses.context';
import useTranslation from 'next-translate/useTranslation';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Chip,
  Card,
  Alert,
  Stack,
  Divider,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

import { getExpenseStatusColor } from './expenses-desktop-view.component';

// ----------------------------------------------------------------------

function ExpensesMobileView() {
  const { t, lang } = useTranslation('common');

  const {
    paginatedExpenses,
    setRejectDialog,
    dispatchEditing,
    dispatchDeleting,
    setApproveDialog,
  } = useExpenses();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {paginatedExpenses.length > 0 ? (
        paginatedExpenses.map(expense => (
          <Box key={expense.id} data-cy="expense-item">
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1">
                    {expense.description}
                  </Typography>
                  <Chip
                    label={t(expense.status)}
                    color={getExpenseStatusColor(expense.status)}
                    size="small"
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {new Date(expense.createdAt).toLocaleDateString(
                      lang === 'ar' ? 'ar-SA' : 'en-US',
                    )}
                  </Typography>
                  <Typography variant="h6">
                    {lang === 'ar'
                      ? `${expense.amount.toFixed(2)} $`
                      : `$${expense.amount.toFixed(2)}`}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton
                    size="small"
                    onClick={() => dispatchEditing(expense)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => dispatchDeleting(expense.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                  {expense.status === 'Pending' && (
                    <>
                      <IconButton
                        size="small"
                        onClick={() => setApproveDialog(expense.id)}
                        color="success"
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setRejectDialog(expense.id)}
                        color="error"
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ))
      ) : (
        <Box>
          <Alert severity="info">No expenses found</Alert>
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

export default ExpensesMobileView;
