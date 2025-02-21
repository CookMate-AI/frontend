export interface FormValues  {
  id: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  agree: boolean;
};

export interface SignupRequest {
  userId: string;
  userPw: string;
  email: string;
}