export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const idRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;

export const emailRules = {
  required: '이메일을 입력해 주세요.',
  pattern: {
    value: emailRegex,
    message: '유효한 이메일 형식을 입력해 주세요.',
  },
};

export const idRules = {
  required: '아이디를 입력해 주세요.',
  pattern: {
    value: idRegex,
    message: '아이디는 영어와 숫자가 혼합되어야 하며, 6~12글자여야 합니다. (특수문자 사용 불가)',
  },
};