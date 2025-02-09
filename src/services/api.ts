import { IResponseNonce, IUserInfo } from '@/types/auth.type';
import { IUser } from '@/types/user.type';
import { axiosInstance, axiosNoAuthInstance } from '@/utils/axios';

export const getAccountInfo = async () => {
  const data = await axiosInstance.get<IUser>(`/users/me`);
  return data.data;
};

export const getNonce = async (address: string) => {
  const data = await axiosNoAuthInstance.get<IResponseNonce>(`/auth/get-nonce/${address}`);
  return data.data;
};

export const postLogin = async (address: string, signature: string, message: string) => {
  const data = await axiosNoAuthInstance.post<IUserInfo>('/auth/login', {
    address,
    signature,
    message,
  });
  return data.data;
};
