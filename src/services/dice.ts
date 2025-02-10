import { IUser } from '@/types/user.type';
import { axiosInstance } from '@/utils/axios';

export const postDiceAction = async (body: { bet: 'low' | 'high'; bet_amount: number; bet_number: number }) => {
  const data = await axiosInstance.post<{
    dice: {
      user_id: string;
      bet: 'high' | 'low';
      bet_amount: number;
      reward: number;
      bet_number: number;
      result_dice: [number, number];
      is_win: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
    user: IUser;
  }>(`/dice/action`, body);
  return data.data;
};
