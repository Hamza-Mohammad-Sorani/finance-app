import { routeNames } from '@constants/constants';
import useTranslation from 'next-translate/useTranslation';

import {
  Receipt as ReceiptIcon,
  Dashboard as DashboardIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';

// ----------------------------------------------------------------------

const useLinks = () => {
  const { t } = useTranslation('layout');

  const navItems = [
    { text: t('dashboard'), icon: <DashboardIcon />, path: routeNames.home },
    { text: t('expenses'), icon: <ReceiptIcon />, path: routeNames.expenses },
    { text: t('cards'), icon: <CreditCardIcon />, path: routeNames.cards },
  ];

  return navItems;
};

export default useLinks;
