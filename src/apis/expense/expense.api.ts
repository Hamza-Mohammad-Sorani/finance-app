import ApiInstance from '@api-instance';
import { AxiosRequestConfig } from 'axios';

import expenseApiRoute from './expense.api-route';
import { IExpenseGetAllResponse } from './expense.type';

// ----------------------------------------------------------------------

const getAll = async (axiosConfig?: AxiosRequestConfig) => {
  const { data } = await ApiInstance.get<IExpenseGetAllResponse>(
    expenseApiRoute.getAll,
    axiosConfig,
  );
  return data;
};

const expenseApi = {
  getAll,
};

// ----------------------------------------------------------------------

export default expenseApi;
