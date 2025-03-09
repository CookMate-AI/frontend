import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { FormValues } from '@/types/findModal';
import AlertModal from '@/components/common/AlertModal';
import {
  useAlertIdEmailModalStore,
  useAlertIdModalStore,
  useAlertPasswordModalStore,
} from '@/stores/useModalStore';
import { postFindIdSendEmail, postFindIdCertification, postFindPw } from '@/lib/api/login';
import { useState } from 'react';

interface FindModalProps {
  type: 'id' | 'password';
  isModalOpen: boolean;
  onClose: () => void;
}

export default function FindModal({ type, isModalOpen, onClose }: FindModalProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [findIdMessage, setFindIdMessage] = useState<string>('');
  const [findPwMessage, setFindPwMessage] = useState<string>('');
  const [closeFindIdSingle, setCloseFindIdSingle] = useState<boolean>(false);
  const [closeFindPWSingle, setCloseFindPWSingle] = useState<boolean>(false);

  const onCheckEmail = async () => {
    const userEmail = watch('email');

    if (!userEmail) {
      alert('이메일을 입력해 주세요.');
      return;
    }

    openCheckEmailModal();

    try {
      const result = await postFindIdSendEmail(userEmail);
      if (result) {
        console.log(result.message);
      }
    } catch (error) {
      console.error('인증번호 전송 중 에러 발생', error);
    }
  };

  const onCheckEmailCertification = async () => {
    const userEmail = watch('email');
    const emailConfirm = watch('emailConfirm');

    if (!emailConfirm) {
      alert('인증번호를 입력해 주세요.');
      return;
    }

    openIdModal();

    try {
      const userData = {
        email: userEmail,
        code: emailConfirm,
      };
      const result = await postFindIdCertification(userData);
      console.log(result);
      if (result.ID) {
        const findId = result.ID;
        setFindIdMessage(`회원님의 아이디는 ${findId} 입니다.`);
        setCloseFindIdSingle(false);
      } else if (result.checkNum === 0) {
        setCloseFindIdSingle(true);
        setFindIdMessage('인증번호가 만료되었습니다.');
      } else if (result.checkNum === 1) {
        setCloseFindIdSingle(true);
        setFindIdMessage('인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('인증번호 확인 중 에러 발생', error);
    }
  };

  const onFindPw = async () => {
    const userId = watch('id');
    const userEmail = watch('email');

    if (!userId) {
      alert('아이디를 입력해 주세요.');
      return;
    }

    if (!userEmail) {
      alert('이메일을 입력해 주세요.');
      return;
    }

    try {
      const userData = {
        userId: userId,
        email: userEmail,
      };
      const result = await postFindPw(userData);
      if (result.status === 200) {
        setFindPwMessage(
          '해당 이메일로 변경된 비밀번호가 발송되었습니다. 반드시 비밀번호를 변경해 주세요.',
        );
        setCloseFindPWSingle(false);
      } else if (result.status === 202) {
        setFindPwMessage('아이디와 이메일이 일치하지 않습니다.');
        setCloseFindPWSingle(true);
      }
    } catch (error) {
      console.error('비밀번호 찾기 중 에러 발생', error);
    }
  };

  const {
    isOpen: isCheckEmailOpen,
    openModal: openCheckEmailModal,
    closeModal: closeCheckEmailModal,
  } = useAlertIdEmailModalStore();

  const {
    isOpen: isIdOpen,
    openModal: openIdModal,
    closeModal: closeIdModalOriginal,
  } = useAlertIdModalStore();

  const closeIdModal = () => {
    closeIdModalOriginal();
    if (!closeFindIdSingle) {
      reset({
        email: '',
        emailConfirm: '',
      });
    }
  };

  const {
    isOpen: isPwOpen,
    openModal: openPwModal,
    closeModal: closePwModalOriginal,
  } = useAlertPasswordModalStore();

  const closePwModal = () => {
    closePwModalOriginal();
    if (!closeFindPWSingle) {
      reset({ id: '', email: '' });
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const onsubmitId = (data: FormValues) => {
    console.log(data);
  }; // 수정필요

  const onsubmitPassword = (data: FormValues) => {
    console.log(data);
    openPwModal();
  }; // 수정필요

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
      onClick={handleClose}
    >
      <div
        className="relative h-436 w-400 rounded-24 border-2 border-orange-400 bg-beige-200 p-24 shadow-lg lg:h-536 lg:w-632"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/icons/ic-close.svg"
          alt="close"
          width={18}
          height={18}
          className="absolute right-24 cursor-pointer"
          onClick={handleClose}
        />
        <div className="flex items-center justify-center gap-8 text-16 font-bold lg:text-20">
          {type === 'id' ? <p>아이디</p> : <p>비밀번호</p>}
          <p>찾기</p>
        </div>
        {type === 'id' ? (
          <form
            onSubmit={handleSubmit(onsubmitId)}
            className="mt-30 flex h-320 w-full flex-col items-center justify-center gap-30 rounded-20 bg-white p-30 lg:h-420"
          >
            <div className="relative flex w-full items-end gap-16">
              <div className="w-full">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: '이메일을 입력해 주세요.',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: '유효한 이메일 형식을 입력해 주세요.',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="이메일"
                      placeholder="이메일을 입력해 주세요."
                      error={!!errors.email}
                    />
                  )}
                />
                {errors.email && (
                  <p className="absolute left-3 text-11 text-red-400 lg:text-13">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                label="인증번호 전송"
                variant="outlinePrimary"
                className="h-40 w-80 flex-shrink-0 text-12 font-bold lg:w-105"
                onClick={onCheckEmail}
              />
            </div>

            <div className="relative flex w-full items-end gap-16">
              <div className="w-full">
                <Controller
                  name="emailConfirm"
                  control={control}
                  defaultValue=""
                  rules={{ required: '인증번호를 입력해 주세요.' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="인증번호"
                      placeholder="인증번호를 입력해 주세요."
                      error={!!errors.emailConfirm}
                    />
                  )}
                />
                {errors.emailConfirm && (
                  <p className="absolute left-3 text-11 text-red-400 lg:text-13">
                    {errors.emailConfirm.message}
                  </p>
                )}
              </div>
              <Button
                label="인증하기"
                variant="outlinePrimary"
                className="h-40 w-80 flex-shrink-0 text-12 font-bold lg:w-105"
                onClick={onCheckEmailCertification}
              />
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onsubmitPassword)}
            className="mt-30 flex h-320 w-full flex-col items-center justify-center gap-30 rounded-20 bg-white p-24 lg:h-420"
          >
            <div className="relative w-full">
              <Controller
                name="id"
                control={control}
                defaultValue=""
                rules={{
                  required: '아이디를 입력해 주세요.',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
                    message:
                      '아이디는 영어와 숫자가 혼합되어야 하며, 6~12글자여야 합니다. (특수문자 사용 불가)',
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="아이디"
                    placeholder="아이디를 입력해 주세요."
                    error={!!errors.id}
                  />
                )}
              />
              {errors.id && (
                <p className="absolute left-3 text-11 text-red-400 lg:text-13">
                  {errors.id.message}
                </p>
              )}
            </div>

            <div className="relative flex w-full items-end gap-16">
              <div className="w-full">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: '이메일을 입력해 주세요.',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: '유효한 이메일 형식을 입력해 주세요.',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="이메일"
                      placeholder="이메일을 입력해 주세요."
                      error={!!errors.email}
                    />
                  )}
                />
                {errors.email && (
                  <p className="absolute left-3 text-11 text-red-400 lg:text-13">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              label="찾기"
              type="submit"
              className="h-35 w-80 text-14 lg:h-40 lg:w-120 lg:text-16"
              onClick={onFindPw}
            />
          </form>
        )}
      </div>
      <AlertModal
        message={'해당 이메일로 인증번호가 전송되었습니다.'}
        isOpen={isCheckEmailOpen}
        onClose={closeCheckEmailModal}
        unitClose
      />
      <AlertModal
        message={findIdMessage}
        isOpen={isIdOpen}
        onClose={closeIdModal}
        unitClose={closeFindIdSingle}
      />
      <AlertModal
        message={findPwMessage}
        isOpen={isPwOpen}
        onClose={closePwModal}
        unitClose={closeFindPWSingle}
      />
    </div>
  );
}
