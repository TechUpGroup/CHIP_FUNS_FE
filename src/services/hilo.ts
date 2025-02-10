import { IUser } from '@/types/user.type';
import { axiosInstance } from '@/utils/axios';

export const postHiloNewGame = async () => {
  const data = await axiosInstance.post<{
    _id: string;
    user_id: string;
    bet_card: string;
    bet_card_index: number;
    is_win: boolean;
    completed: boolean;

    createdAt: string;
    updatedAt: string;
  }>(`/hilo/new-game`);
  return data.data;
};

export const postHiloAction = async (body: { bet: 'low or equal' | 'high or equal'; bet_amount: number }) => {
  const data = await axiosInstance.post<{
    card: {
      _id: string;
      user_id: string;
      bet_card: string;
      bet_card_index: number;
      is_win: boolean;
      completed: boolean;
      bet: string;
      bet_amount: number;
      result_card: string;
      result_card_index: number;
      reward: number;
    };
    user: IUser;
  }>(`/hilo/action`, body);
  return data.data;
};
