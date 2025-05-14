import React from 'react';
import cardApi from '@apis/card/card.api';
import { ICard } from '@apis/card/card.type';
import expenseApi from '@apis/expense/expense.api';
import { IExpense } from '@apis/expense/expense.type';
import SEO from '@components/common/seo/seo.component';
import HomeContent from '@components/pages-components/home/components/home-content.component';

// ----------------------------------------------------------------------

type Props = {
  cards: ICard[];
  expenses: IExpense[];
};

// ----------------------------------------------------------------------

export default function HomePage({ cards, expenses }: Props) {
  return (
    <>
      <SEO
        title="Dashboard - Finance App"
        description="Transform your financial management with our Dashboard Finance App! Easily track expenses,  and visualize your financial health in real-time. With intuitive features and secure data handling, take control of your finances today. Perfect for budgeting, expense tracking, and achieving your financial goals."
      />
      <HomeContent cards={cards} expenses={expenses} />
    </>
  );
}

// ----------------------------------------------------------------------

export async function getStaticProps() {
  const { cards } = await cardApi.getAll();
  const { expenses } = await expenseApi.getAll();

  return {
    props: {
      cards,
      expenses,
    },
    revalidate: 60,
  };
}
