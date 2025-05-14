import useTranslation from 'next-translate/useTranslation';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  onClose: VoidFunction;
};

// ----------------------------------------------------------------------

function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}: ConfirmDialogProps) {
  const { t, lang } = useTranslation('common');

  return (
    <Dialog
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      {...other}
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && (
        <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>
      )}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          {t('cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

export default ConfirmDialog;
