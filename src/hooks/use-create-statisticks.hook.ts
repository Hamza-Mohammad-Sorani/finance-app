import { useMemo } from 'react';
import { ICard } from '@apis/card/card.type';
import { IExpense } from '@apis/expense/expense.type';
import useTranslation from 'next-translate/useTranslation';
import { IStatisticsCardProps } from '@components/pages-components/home/components/statistics-card.component';

import { useTheme } from '@mui/material';
import {
  Receipt,
  CreditCard,
  TrendingUp,
  AttachMoney,
} from '@mui/icons-material';

// ----------------------------------------------------------------------

export const STATUS_COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
];

// ----------------------------------------------------------------------

const useCreateStatistics = ({
  cards,
  expenses,
}: {
  cards: ICard[];
  expenses: IExpense[];
}) => {
  const { t, lang } = useTranslation('common');

  const { palette } = useTheme();

  const stats = useMemo(() => {
    const totalExpenseAmount = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const expensesByStatus = {
      Pending: expenses.filter(e => e.status === 'Pending').length,
      Approved: expenses.filter(e => e.status === 'Approved').length,
      Rejected: expenses.filter(e => e.status === 'Rejected').length,
    };
    const expenseAmountByStatus = {
      Pending: expenses
        .filter(e => e.status === 'Pending')
        .reduce((sum, expense) => sum + expense.amount, 0),
      Approved: expenses
        .filter(e => e.status === 'Approved')
        .reduce((sum, expense) => sum + expense.amount, 0),
      Rejected: expenses
        .filter(e => e.status === 'Rejected')
        .reduce((sum, expense) => sum + expense.amount, 0),
    };

    const activeCards = cards.filter(c => c.status === 'Active').length;
    const inactiveCards = cards.filter(c => c.status === 'Inactive').length;

    return {
      expenses: {
        total: expenses.length,
        totalAmount: totalExpenseAmount,
        byStatus: expensesByStatus,
        amountByStatus: expenseAmountByStatus,
      },
      cards: {
        total: cards.length,
        active: activeCards,
        inactive: inactiveCards,
      },
    };
  }, [expenses, cards]);

  const expenseStatusData = useMemo(
    () => [
      { name: 'Pending', value: stats.expenses.byStatus.Pending },
      { name: 'Approved', value: stats.expenses.byStatus.Approved },
      { name: 'Rejected', value: stats.expenses.byStatus.Rejected },
    ],
    [stats.expenses.byStatus],
  );

  const expenseAmountData = useMemo(
    () => [
      { name: 'Pending', amount: stats.expenses.amountByStatus.Pending },
      { name: 'Approved', amount: stats.expenses.amountByStatus.Approved },
      { name: 'Rejected', amount: stats.expenses.amountByStatus.Rejected },
    ],
    [stats.expenses.amountByStatus],
  );

  const cardStatusData = useMemo(
    () => [
      { name: 'Active', value: stats.cards.active },
      { name: 'Inactive', value: stats.cards.inactive },
    ],
    [stats.cards],
  );

  const pieChartOptions = {
    chart: {
      type: 'pie' as const,
    },
    labels: expenseStatusData.map(item => item.name),
    colors: [palette.warning.main, palette.success.main, palette.error.main],
    legend: {
      position: 'bottom' as const,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom' as const,
          },
        },
      },
    ],
  };

  const barChartOptions = {
    chart: {
      type: 'bar' as const,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded' as const,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: expenseAmountData.map(item => item.name),
    },
    yaxis: {
      title: {
        text: t('amountInDollars'),
      },
    },
    fill: {
      colors: ['#8884d8'],
    },
    tooltip: {
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
  };

  const cardPieChartOptions = {
    chart: {
      type: 'pie' as const,
    },
    labels: cardStatusData.map(item => item.name),
    colors: [palette.success.main, palette.grey['500']],
    legend: {
      position: 'bottom' as const,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom' as const,
          },
        },
      },
    ],
  };

  const statisticsCards: IStatisticsCardProps[] = useMemo(
    () => [
      {
        title: t('totalExpenses'),
        total: stats.expenses.total,
        Icon: Receipt,
        end: `${t('totalAmount')}: $${stats.expenses.totalAmount.toFixed(2)}`,
        bgcolor: 'primary.main',
      },
      {
        title: t('totalAmount'),
        total: `$${stats.expenses.totalAmount.toFixed(2)}`,
        Icon: AttachMoney,
        end: new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US'),
        bgcolor: 'success.main',
      },
      {
        title: t('totalCards'),
        total: stats.cards.total,
        Icon: CreditCard,
        bgcolor: 'info.main',
      },
      {
        title: t('activeCards'),
        total: `${stats.cards.active} / ${stats.cards.total}`,
        Icon: TrendingUp,
        bgcolor: 'warning.main',
        end: `${Math.round(
          (stats.cards.active / (stats.cards.total || 1)) * 100,
        )}
        % ${t('active')}`,
      },
    ],
    [
      lang,
      stats.cards.active,
      stats.cards.total,
      stats.expenses.total,
      stats.expenses.totalAmount,
      t,
    ],
  );

  return {
    stats,
    cardStatusData,
    pieChartOptions,
    barChartOptions,
    statisticsCards,
    expenseStatusData,
    expenseAmountData,
    cardPieChartOptions,
  };
};

// ----------------------------------------------------------------------

export default useCreateStatistics;
