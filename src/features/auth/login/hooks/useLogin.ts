import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import useAuthStore from '@/stores/auth/useAuthStore';

import { postLogin } from '../api/loginApi';
import { LoginFormValues } from '../types';

export function useLogin() {
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async (data: LoginFormValues) => {
      try {
        const loginData = {
          username: data.id,
          password: data.password,
        };

        const result = await postLogin(loginData);

        if (result) {
          alert(result.message);
          login(result.user, result.token);
        }

        router.push('/');
      } catch (error) {
        console.error('로그인 중 에러 발생', error);

        if (error === 'Request failed with status code 404') {
          alert('가입된 사용자가 아닙니다.');
        } else if (error === 'Request failed with status code 401') {
          alert('비밀번호가 일치하지 않습니다.');
        } else {
          alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    },
    [login, router],
  );

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
  };
}
