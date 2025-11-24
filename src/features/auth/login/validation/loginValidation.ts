export const idRules = {
  required: '아이디를 입력해 주세요.',
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
    message: '아이디는 영어+숫자 6~12자입니다.',
  },
};

export const passwordRules = {
  required: '비밀번호를 입력해 주세요.',
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{8,}$/,
    message: '비밀번호는 영문, 숫자 포함 8자 이상입니다.',
  },
};
