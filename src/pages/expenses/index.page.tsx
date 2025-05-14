import type React from 'react';
import expenseApi from '@apis/expense/expense.api';
import { IExpense } from '@apis/expense/expense.type';
import SEO from '@components/common/seo/seo.component';
import { ExpensesProvider } from '@contexts/expenses.context';
import ExpensesContent from '@components/pages-components/expenses/components/expenses-content.component';

// ----------------------------------------------------------------------

type Props = {
  expenses: IExpense[];
};

// ----------------------------------------------------------------------

export default function ExpensesPage({ expenses }: Props) {
  return (
    <>
      <SEO
        title="Expenses - Finance App"
        description="Manage your finances effortlessly with our Expenses Page. Monitor spending, categorize transactions, and analyze your financial habits in one place. Stay on top of your budget and make informed decisions with real-time insights."
      />
      <ExpensesProvider initialExpenses={expenses}>
        <ExpensesContent />
      </ExpensesProvider>
    </>
  );
}

// ----------------------------------------------------------------------

export async function getStaticProps() {
  const { expenses } = await expenseApi.getAll();

  return {
    props: {
      expenses,
    },
    revalidate: 60,
  };
}
