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
