import * as yup from 'yup';
import type React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IExpense } from '@apis/expense/expense.type';
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
  editItem: IExpense | null;
  onClose: VoidFunction;
  onSubmit: (expense: IExpense) => void;
}

// ----------------------------------------------------------------------

function ExpenseFormProvider({ open, editItem, onClose, onSubmit }: Props) {
  const { t } = useTranslation('common');

  const schema = yup.object().shape({
    description: yup.string().required(t('required')),
    amount: yup
      .number()
      .typeError(t('mustBeNumber'))
      .positive(t('mustBePositive'))
      .required(t('required')),
  });

  const methods = useForm<IExpense>({
    defaultValues: editItem ?? undefined,
    resolver: yupResolver(schema),
  });

  const handleSubmit = (data: IExpense) => {
    onSubmit({
      ...data,
      createdAt: editItem ? data.createdAt : new Date().toISOString(),
      status: data.status || 'Pending',
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
            name="description"
            label={t('description')}
            required
          />

          <RHFTextField
            type="number"
            fullWidth
            name="amount"
            label={t('amount')}
            required
            slotProps={{
              input: {
                startAdornment: '$',
              },
            }}
          />

          <RHFSelect
            name="status"
            label={t('status')}
            helperText={t('defaultStatusPending')}
          >
            <MenuItem value="Pending">{t('pending')}</MenuItem>
            <MenuItem value="Approved">{t('approved')}</MenuItem>
            <MenuItem value="Rejected">{t('rejected')}</MenuItem>
          </RHFSelect>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button type="submit" variant="contained" color="primary">
          {editItem ? t('editExpense') : t('addExpense')}
        </Button>
      </DialogActions>
    </FormProvider>
  );
}

function ExpenseForm({ open, editItem, onClose, onSubmit }: Props) {
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
        {editItem ? t('editExpense') : t('addExpense')}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label={t('close')}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <ExpenseFormProvider
        open={open}
        editItem={editItem}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
}

export default ExpenseForm;
