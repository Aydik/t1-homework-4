export interface User {
  id: string;
  name: string;
  surName: string;
  fullName: string;
  email: string;
  password: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}

export type UserCreateDto = Omit<User, 'id'>;
export type UserPatchDto = Omit<User, 'id' | 'password' | 'email'>;
