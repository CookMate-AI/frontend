export interface FormValues {
  id: string;
  email: string;
  nickname: string;
  password: string;
  newPassword: string;
  passwordConfirm: string;
}

export interface UserInfoData {
  userId: string;
  nickName: string;
  email: string;
  joinDate: string;
  updateDate: string | null;
  role: string;
}

export interface ChangeUserData {
  num: number;
  nickName: string;
  userPw: string;
}