import { IUser } from '@/types/user.type';
import { axiosInstance } from '@/utils/axios';

export const postFlipsAction = async (body: { head_tail: 'HEADS' | 'TAILS'; bet_amount: number }) => {
  const data = await axiosInstance.post<{
    flip: {
      user_id: string;
      head_tail: 'HEADS' | 'TAILS';
      bet_amount: number;
      reward: number;
      is_win: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
    user: IUser;
  }>(`/flips/action`, body);
  return data.data;
};
