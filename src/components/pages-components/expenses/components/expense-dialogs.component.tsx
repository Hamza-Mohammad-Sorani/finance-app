import React from 'react';
import { useExpenses } from '@contexts/expenses.context';
import useTranslation from 'next-translate/useTranslation';
import ConfirmDialog from '@components/common/confirm-dialog/confirm-dialog.component';

import { Button } from '@mui/material';

// ----------------------------------------------------------------------

function ExpenseDialogs() {
  const { t } = useTranslation('common');

  const {
    deleteDialog,
    rejectDialog,
    approveDialog,
    setRejectDialog,
    setApproveDialog,
    handleDeleteExpense,
    handleRejectExpense,
    handleApproveExpense,
    dispatchResetCrudState,
  } = useExpenses();

  return (
    <>
      <ConfirmDialog
        open={!!deleteDialog}
        title={t('delete')}
        content={t('confirm-delete')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteExpense()}
          >
            {t('delete')}
          </Button>
        }
        onClose={() => dispatchResetCrudState()}
      />

      <ConfirmDialog
        open={!!rejectDialog}
        title={t('rejectExpense')}
        content={t('rejectExpenseConfirmation')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleRejectExpense}
          >
            {t('reject')}
          </Button>
        }
        onClose={() => setRejectDialog(null)}
      />

      <ConfirmDialog
        open={!!approveDialog}
        title={t('approveExpense')}
        content={t('approveExpenseConfirmation')}
        action={
          <Button variant="contained" onClick={handleApproveExpense}>
            {t('approve')}
          </Button>
        }
        onClose={() => setApproveDialog(null)}
      />
    </>
  );
}

export default ExpenseDialogs;
