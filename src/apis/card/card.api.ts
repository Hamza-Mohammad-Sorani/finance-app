import ApiInstance from '@api-instance';
import { AxiosRequestConfig } from 'axios';

import cardApiRoute from './card.api-route';
import { ICardGetAllResponse } from './card.type';

// ----------------------------------------------------------------------

const getAll = async (axiosConfig?: AxiosRequestConfig) => {
  const { data } = await ApiInstance.get<ICardGetAllResponse>(
    cardApiRoute.getAll,
    axiosConfig,
  );
  return data;
};

// ----------------------------------------------------------------------

const cardApi = {
  // add,
  getAll,
  // update,
  // remove,
};

// ----------------------------------------------------------------------

export default cardApi;
