export interface SignupUserTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
}

export interface VerifyUserTypes {
  email: string;
  verificationCode: string;
  codeType: string;
}

export interface LoginUserTypes {
  email: string;
  password: string;
}

export interface ForgotPasswordTypes {
  email: string;
}

export interface ResetPasswordTypes {
  email: string;
  newPassword: string;
}
