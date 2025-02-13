import { IPaginationResponse } from '@/types/api.type';
import { axiosInstance } from '@/utils/axios';

export const getHistoryAction = async (params: {
  page: number;
  limit: number;
  tx_type?: 'deposited' | 'withdrawn';
  tx_status?: 'completed' | 'failed';
  fromDate?: number;
  toDate?: number;
}) => {
  const data = await axiosInstance.get<
    IPaginationResponse<{
      event: 'deposited' | 'withdrawn';
      amount: number;
      timestamp: string;
      status: 'completed' | 'failed';
    }>
  >(`/histories`, { params });
  return data.data;
};
