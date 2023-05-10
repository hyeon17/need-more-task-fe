export interface IJoin {
  email?: string;
  password?: string;
  password_check?: string;
  phone?: string;
  fullname?: string;
  department?: string;
  joinCompanyYear?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  userId: number;
  department?: string;
  email: string;
  fullName: string;
  joinCompanyYear: string;
  phone: string;
  profileImageUrl: string;
  role?: string;
}

export type IUserRole = Omit<IUser, 'phone'>;

export interface AccountInfoProps {
  userInfo: IUser;
}

export interface IValidatePassword {
  password: string;
  passwordCheck: string;
}

export interface IUpdateProfile {
  profileId?: string;
  department?: string;
  fullName: string;
  joinCompanyYear: string;
  phone?: string;
  profileImageUrl: string;
  password?: string;
  passwordCheck?: string;
}

export interface IUpdateRole {
  userId: number;
  role: string;
}
