import { axiosInstance } from '@/utils/axios';

export const postUsersDeposit = async (body: { address: string; amount: number }) => {
  const data = await axiosInstance.post<string>(`/users/deposit`, body);
  return data.data;
};

export const postUsersWithdraw = async (body: { address: string; amount: number }) => {
  const data = await axiosInstance.post<string>(`/users/withdraw`, body);
  return data.data;
};
