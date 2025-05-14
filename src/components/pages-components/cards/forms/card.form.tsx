import * as yup from 'yup';
import type React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ICard } from '@apis/card/card.type';
import { yupResolver } from '@hookform/resolvers/yup';
import useTranslation from 'next-translate/useTranslation';
import FormProvider from '@components/form-provider/form-provider.component';
import { RHFSelect } from '@components/form-provider/components/rhf-select.component';
import RHFTextField from '@components/form-provider/components/rhf-text-field.component';

import { Close as CloseIcon } from '@mui/icons-material';
import {
  Stack,
  Dialog,
  Button,
  MenuItem,
  useTheme,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';

// ----------------------------------------------------------------------

interface Props {
  open: boolean;
  editItem: ICard | null;
  onClose: VoidFunction;
  onSubmit: (card: ICard) => void;
}

// ----------------------------------------------------------------------

function CardFormProvider({ open, editItem, onClose, onSubmit }: Props) {
  const { t } = useTranslation('common');

  const schema = yup.object().shape({
    cardholderName: yup.string().required(t('required')),
    last4Digits: yup
      .string()
      .required(t('required'))
      .matches(/^[0-9]{4}$/, t('mustBe4Digits')),
  });

  const methods = useForm<ICard>({
    defaultValues: editItem ?? undefined,
    resolver: yupResolver(schema),
  });

  const handleSubmit = (data: ICard) => {
    onSubmit({
      ...data,
      issuedAt: editItem ? data.issuedAt : new Date().toISOString(),
      status: data.status || 'Active',
    });
  };

  useEffect(
    () => () => {
      methods.reset({});
    },
    [methods],
  );

  return (
    <FormProvider
      methods={methods}
      onSubmit={methods.handleSubmit(handleSubmit)}
    >
      <DialogContent>
        <Stack spacing={2}>
          <RHFTextField
            fullWidth
            name="cardholderName"
            label={t('cardholderName')}
            required
            data-cy="card-name"
          />

          <RHFTextField
            fullWidth
            name="last4Digits"
            label={t('last4Digits')}
            required
            data-cy="card-number"
          />

          <RHFSelect
            name="status"
            label={t('status')}
            helperText={t('defaultStatusActive')}
            data-cy="card-status"
          >
            <MenuItem value="Active">{t('active')}</MenuItem>
            <MenuItem value="Inactive">{t('inactive')}</MenuItem>
          </RHFSelect>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-cy="submit-card"
        >
          {editItem ? t('editCard') : t('addCard')}
        </Button>
      </DialogActions>
    </FormProvider>
  );
}

function CardForm({ open, editItem, onClose, onSubmit }: Props) {
  const { t, lang } = useTranslation('common');

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {editItem ? t('editCard') : t('addCard')}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <CardFormProvider
        open={open}
        editItem={editItem}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
}

export default CardForm;
