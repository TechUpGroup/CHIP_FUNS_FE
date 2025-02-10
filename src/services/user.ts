import { axiosInstance } from '@/utils/axios';

export const postUsersDeposit = async (body: { address: string; amount: number }) => {
  const data = await axiosInstance.post<string>(`/users/deposit`, body);
  return data.data;
};

export const postUsersWithdraw = async (body: { address: string; amount: number }) => {
  const data = await axiosInstance.post<string>(`/users/withdraw`, body);
  return data.data;
};

export const getGameNoti = async () => {
  const data = await axiosInstance.get<
    {
      username: string;
      game: string;
      bet_amount: string;
      reward: string;
      isWin: boolean;
      timestamp: number;
    }[]
  >(`/users/game_noti`);
  return data.data;
};
