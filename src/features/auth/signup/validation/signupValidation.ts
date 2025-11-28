export const idRules = {
  required: '아이디를 입력해 주세요.',
  validate: (value: string) => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    const forbiddenWords = ['admin', 'fuck'];

    if (!pattern.test(value)) {
      return '아이디는 영어+숫자 6~12글자여야 합니다.';
    }
    if (forbiddenWords.some((word) => value.toLowerCase().includes(word))) {
      return '아이디에 금지된 단어가 포함되어 있습니다.';
    }
    return true;
  },
};

export const emailRules = {
  required: '이메일을 입력해 주세요.',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '유효한 이메일 형식이 아닙니다.',
  },
};

export const emailConfirmRules = {
  required: '인증번호를 입력해 주세요.',
};

export const passwordRules = {
  required: '비밀번호를 입력해 주세요.',
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: '비밀번호는 영문+숫자 포함 8자 이상입니다.',
  },
};

export const passwordConfirmRules = (password: string) => ({
  required: '비밀번호를 확인해 주세요.',
  validate: (value: string) => value === password || '비밀번호가 일치하지 않습니다.',
});
