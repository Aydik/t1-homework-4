import { axiosInstance } from 'shared/api/axiosInstance.ts';
import type { User, UserCreateDto, UserPatchDto } from 'entities/User/types';

export const getUsers = async (): Promise<User[]> => {
  try {
    return axiosInstance.get('users');
  } catch (err) {
    throw err;
  }
};

export const createUser = async (data: UserCreateDto): Promise<User> => {
  try {
    return axiosInstance.post('users', data);
  } catch (err) {
    throw err;
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    return axiosInstance.get(`users/${id}`);
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (id: string, data: UserPatchDto): Promise<User> => {
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
