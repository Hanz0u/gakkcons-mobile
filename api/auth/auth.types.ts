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
}

export interface LoginUserTypes {
  email: string;
  password: string;
}
