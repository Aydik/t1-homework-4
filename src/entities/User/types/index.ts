import type { EmploymentType } from 'shared/types';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  birthDate?: string;
  phoneNumber?: string;
  employment?: EmploymentType;
  userAgreement?: boolean;
}

export type UserCreateDto = Omit<User, 'id'>;
export type UserPatchDto = Omit<User, 'id' | 'userAgreement' | 'email'>;
