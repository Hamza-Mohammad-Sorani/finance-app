import React from 'react';
import { useCards } from '@contexts/cards.context';
import useTranslation from 'next-translate/useTranslation';
import ConfirmDialog from '@components/common/confirm-dialog/confirm-dialog.component';

import { Button } from '@mui/material';

// ----------------------------------------------------------------------

function CardDialogs() {
  const { t } = useTranslation('common');

  const {
    deleteDialog,
    deactivateDialog,
    activateDialog,
    handleDeleteCard,
    setActivateDialog,
    handleActivateCard,
    setDeactivateDialog,
    handleDeactivateCard,
    dispatchResetCrudState,
  } = useCards();

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
            onClick={() => handleDeleteCard()}
            data-cy="confirm-delete"
          >
            {t('delete')}
          </Button>
        }
        onClose={() => dispatchResetCrudState()}
      />

      <ConfirmDialog
        open={!!deactivateDialog}
        title={t('deactivateCard')}
        content={t('deactivateCardConfirmation')}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleDeactivateCard}
            data-cy="confirm-deactivate"
          >
            {t('deactivate')}
          </Button>
        }
        onClose={() => setDeactivateDialog(null)}
      />

      <ConfirmDialog
        open={!!activateDialog}
        title={t('activateCard')}
        content={t('activateCardConfirmation')}
        action={
          <Button
            variant="contained"
            onClick={handleActivateCard}
            data-cy="confirm-activate"
          >
            {t('activate')}
          </Button>
        }
        onClose={() => setActivateDialog(null)}
      />
    </>
  );
}

export default CardDialogs;
