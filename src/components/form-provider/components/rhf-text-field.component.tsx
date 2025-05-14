import { Path, Controller, FieldValues, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
};

// ----------------------------------------------------------------------

function RHFTextField<T extends FieldValues>({
  name,
  helperText,
  type,
  required,
  label,
  onWheel,
  ...other
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={required ? `${label} *` : label}
          fullWidth
          type={type}
          value={field.value}
          onWheel={e => {
            if (type === 'number') e.currentTarget.blur();
            onWheel?.(e);
          }}
          onChange={event => {
            if (type === 'number') {
              field.onChange(
                !!event.target.value || event.target.value === '0'
                  ? Number(event.target.value)
                  : null,
              );
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export default RHFTextField;
