import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import {
  getCheckUserId,
  postCheckEmailCertification,
  postCheckEmailSendEmail,
  postSignup,
} from '../api/signupApi';
import { SignupFormValues } from '../types';

export function useSignup() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      id: '',
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
      agree: false,
    },
  });

  const onCheckUserId = useCallback(async () => {
    const id = watch('id');
    if (!id) return alert('아이디를 입력해 주세요.');

    const result = await getCheckUserId(id);
    alert(result.message);
  }, [watch]);

  const onCheckEmail = useCallback(async () => {
    const email = watch('email');
    if (!email) return alert('이메일을 입력해 주세요.');

    const result = await postCheckEmailSendEmail(email);
    alert(result.message);
  }, [watch]);

  const onCheckEmailCertification = useCallback(async () => {
    const email = watch('email');
    const code = watch('emailConfirm');

    if (!code) return alert('인증번호를 입력해 주세요.');

    const result = await postCheckEmailCertification({ email, code });
    alert(result.message);
  }, [watch]);

  const onSubmit = useCallback(async (data: SignupFormValues) => {
    const signupData = {
      userId: data.id,
      userPw: data.password,
      email: data.email,
    };

    const res = await postSignup(signupData);
    alert(res.message);
  }, []);

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    onCheckUserId,
    onCheckEmail,
    onCheckEmailCertification,
  };
}
