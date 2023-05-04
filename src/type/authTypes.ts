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
  userId: string;
  department: string;
  email: string;
  fullName: string;
  joinCompanyYear: string;
  phone: string;
  profileImageUrl: string;
}

export interface AccountInfoProps {
  userInfo: IUser;
}
