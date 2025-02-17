import { axiosInstance } from '@/utils/axios';

export interface IPartner {
  _id: string;
  token: string;
  active: boolean;
  image: string;
  name: string;
  decimal: number;
  reward: number;
  status: boolean;
  claimed: boolean;
  holdAt?: number;
  claimedAt?: number;
  balance: number;
}

export const getPartnerList = async () => {
  const data = await axiosInstance.get<IPartner[]>(`/partners`);
  return data.data;
};

export const postClaimPartner = async (body: { token: string }) => {
  const data = await axiosInstance.post<any>(`/partners/claim`, body);
  return data.data;
};
