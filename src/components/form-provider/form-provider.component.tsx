import { CSSProperties } from 'react';
import {
  FieldValues,
  UseFormReturn,
  FormProvider as Form,
} from 'react-hook-form';

// ----------------------------------------------------------------------

type Props<T extends FieldValues> = {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: VoidFunction;
  style?: CSSProperties;
};

// ----------------------------------------------------------------------

function FormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
  style,
}: Props<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} style={style}>
        {children}
      </form>
    </Form>
  );
}

// ----------------------------------------------------------------------

export default FormProvider;
