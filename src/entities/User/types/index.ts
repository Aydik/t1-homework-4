export interface User {
  id: string;
  name: string;
  surName: string;
  fullName: string;
  email: string;
  password: string;
  birthDate?: Date;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}

export type UserCreateDto = Omit<User, 'id'>;
export type UserPatchDto = Omit<User, 'id' | 'password' | 'email'>;
