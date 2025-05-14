import dynamic from 'next/dynamic';
import { ICard } from '@apis/card/card.type';
import { IExpense } from '@apis/expense/expense.type';
import useTranslation from 'next-translate/useTranslation';
import useCreateStatistics from '@hooks/use-create-statisticks.hook';

import {
  Cancel,
  CreditCard,
  CheckCircle,
  CreditCardOff,
  HourglassEmpty,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  Paper,
  Divider,
  useTheme,
  Typography,
  useMediaQuery,
} from '@mui/material';

import StatisticsCard from './statistics-card.component';

// ----------------------------------------------------------------------

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  cards: ICard[];
  expenses: IExpense[];
};

// ----------------------------------------------------------------------

function HomeContent({ cards, expenses }: Props) {
  const { t } = useTranslation('common');

  const { palette, breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const {
    stats,
    cardStatusData,
    statisticsCards,
    pieChartOptions,
    barChartOptions,
    expenseStatusData,
    expenseAmountData,
    cardPieChartOptions,
  } = useCreateStatistics({ cards, expenses });

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {statisticsCards.map(card => (
          <Grid
            key={card.title}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <StatisticsCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              {t('expensesStatusDistribution')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: { xs: 250, sm: 300 } }}>
              {typeof window !== 'undefined' && (
                <Chart
                  options={pieChartOptions}
                  series={expenseStatusData.map(item => item.value)}
                  type="pie"
                  height="100%"
                />
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-around',
                mt: 2,
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HourglassEmpty sx={{ color: palette.warning.main, mr: 1 }} />
                <Typography variant="body2">
                  {t('pending')}: {stats.expenses.byStatus.Pending}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ color: palette.success.main, mr: 1 }} />
                <Typography variant="body2">
                  {t('approved')}: {stats.expenses.byStatus.Approved}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Cancel sx={{ color: palette.error.main, mr: 1 }} />
                <Typography variant="body2">
                  {t('rejected')}: {stats.expenses.byStatus.Rejected}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              {t('expenseAmountByStatus')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: { xs: 250, sm: 300 } }}>
              {typeof window !== 'undefined' && (
                <Chart
                  options={barChartOptions}
                  series={[
                    {
                      name: 'Amount',
                      data: expenseAmountData.map(item => item.amount),
                    },
                  ]}
                  type="bar"
                  height="100%"
                />
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-around',
                mt: 2,
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HourglassEmpty sx={{ color: '#8884d8', mr: 1 }} />
                <Typography variant="body2">
                  {t('pending')}: $
                  {stats.expenses.amountByStatus.Pending.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ color: '#8884d8', mr: 1 }} />
                <Typography variant="body2">
                  {t('approved')}: $
                  {stats.expenses.amountByStatus.Approved.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Cancel sx={{ color: '#8884d8', mr: 1 }} />
                <Typography variant="body2">
                  {t('rejected')}: $
                  {stats.expenses.amountByStatus.Rejected.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              {t('cardStatusDistribution')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ height: { xs: 250, sm: 300 } }}>
              {typeof window !== 'undefined' && (
                <Chart
                  options={cardPieChartOptions}
                  series={cardStatusData.map(item => item.value)}
                  type="pie"
                  height="100%"
                />
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-around',
                mt: 2,
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CreditCard sx={{ color: palette.success.main, mr: 1 }} />
                <Typography variant="body2">
                  {t('active')}: {stats.cards.active}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CreditCardOff sx={{ color: palette.grey['500'], mr: 1 }} />
                <Typography variant="body2">
                  {t('inactive')}: {stats.cards.inactive}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

export default HomeContent;
