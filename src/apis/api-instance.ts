import axios from 'axios';
import { API_BASE_URL } from '@constants/constants';

// ----------------------------------------------------------------------

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});

// ----------------------------------------------------------------------

export default apiInstance;
