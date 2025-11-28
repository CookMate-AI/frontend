import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAlertIdEmailModalStore, useAlertIdModalStore } from '@/stores/ui/useModalStore';

import { postSendFindIdEmail, postVerifyFindIdCode } from '../api/findApi';
import { FindFormValues } from '../types';

export function useFindId() {
  const { openModal: openEmailModal } = useAlertIdEmailModalStore();
  const { openModal: openResultModal } = useAlertIdModalStore();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FindFormValues>({
    defaultValues: { email: '', emailConfirm: '' },
  });

  const [resultMessage, setResultMessage] = useState('');
  const [isClose, setIsClose] = useState(false);

  const onSendEmail = useCallback(async () => {
    const email = watch('email');
    if (!email) return alert('이메일을 입력해 주세요');

    openEmailModal();
    await postSendFindIdEmail(email);
  }, [watch, openEmailModal]);

  const onVerifyCode = useCallback(async () => {
    const email = watch('email');
    const code = watch('emailConfirm');

    if (!code) return alert('인증번호를 입력해 주세요');

    openResultModal();

    const res = await postVerifyFindIdCode({ email, code });

    if (res.ID) {
      setResultMessage(`회원님의 아이디는 ${res.ID} 입니다.`);
      setIsClose(false);
    } else if (res.checkNum === 0) {
      setResultMessage('인증번호가 만료되었습니다.');
      setIsClose(true);
    } else {
      setResultMessage('인증번호가 일치하지 않습니다.');
      setIsClose(true);
    }
  }, [watch, openResultModal]);

  const closeModal = () => {
    if (!isClose) reset({ email: '', emailConfirm: '' });
  };

  return {
    control,
    handleSubmit,
    errors,
    onSendEmail,
    onVerifyCode,
    resultMessage,
    isClose,
    closeModal,
  };
}
