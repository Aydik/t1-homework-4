import { axiosInstance } from 'shared/api/axiosInstance.ts';
import type { User, UserCreateDto, UserPatchDto } from 'entities/User/types';
import type { AxiosResponse } from 'axios';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axiosInstance.get('users');
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (data: UserCreateDto) => {
  try {
    return axiosInstance.post('users', data);
  } catch (err) {
    throw err;
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axiosInstance.get(`users/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (id: string, data: UserPatchDto) => {
  try {
    return axiosInstance.patch(`users/${id}`, data);
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (id: string) => {
  try {
    return axiosInstance.delete(`users/${id}`);
  } catch (err) {
    throw err;
  }
};
