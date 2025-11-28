import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAlertPasswordModalStore } from '@/stores/ui/useModalStore';

import { postFindPassword } from '../api/findApi';
import { FindFormValues } from '../types';

export function useFindPassword() {
  const { openModal: openResultModal } = useAlertPasswordModalStore();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FindFormValues>({
    defaultValues: { id: '', email: '' },
  });

  const [resultMessage, setResultMessage] = useState('');
  const [isClose, setIsClose] = useState(false);

  const onFindPw = useCallback(async () => {
    const userId = watch('id');
    const email = watch('email');

    if (!userId || !email) return alert('아이디와 이메일을 입력해 주세요.');

    const res = await postFindPassword({ userId, email });

    openResultModal();

    if (res.status === 200) {
      setResultMessage('임시 비밀번호가 이메일로 전송되었습니다.');
      setIsClose(false);
    } else {
      setResultMessage('아이디와 이메일이 일치하지 않습니다.');
      setIsClose(true);
    }
  }, [watch, openResultModal]);

  const closeModal = () => {
    if (!isClose) reset({ id: '', email: '' });
  };

  return {
    control,
    handleSubmit,
    errors,
    onFindPw,
    resultMessage,
    isClose,
    closeModal,
  };
}
