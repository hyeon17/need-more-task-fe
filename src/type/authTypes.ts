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
