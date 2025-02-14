import { IPaginationResponse } from '@/types/api.type';
import { axiosInstance } from '@/utils/axios';

export interface IHistory {
  event: 'deposited' | 'withdrawn';
  amount: number;
  signature: string;
  timestamp: string;
  status: 'completed' | 'failed';
}

export const getHistoryAction = async (params: {
  page: number;
  limit: number;
  tx_type?: 'deposited' | 'withdrawn';
  tx_status?: 'completed' | 'failed';
  fromDate?: number;
  toDate?: number;
}) => {
  const data = await axiosInstance.get<IPaginationResponse<IHistory>>(`/histories`, { params });
  return data.data;
};
