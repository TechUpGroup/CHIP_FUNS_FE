import { axiosInstance } from '@/utils/axios';

export interface IPartner {
  _id: string;
  token: string;
  reward: number;
  active: boolean;
  status: boolean;
  claimed: boolean;
}

export const getPartnerList = async () => {
  const data = await axiosInstance.get<IPartner[]>(`/partners`);
  return data.data;
};

export const postClaimPartner = async (body: { token: string }) => {
  const data = await axiosInstance.post<any>(`/partners/claim`, body);
  return data.data;
};
