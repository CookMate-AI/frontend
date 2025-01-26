import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { FormValues } from '@/types/findModal';
import AlertModal from '@/components/common/AlertModal';
import { useAlertIdModalStore, useAlertPasswordModalStore } from '@/stores/useModalStore';

interface FindModalProps {
  type: 'id' | 'password';
  isModalOpen: boolean;
  onClose: () => void;
}

export default function FindModal({ type, isModalOpen, onClose }: FindModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const {
    isOpen: isIdOpen,
    closeModal: closeIdModal,
    openModal: openIdModal,
  } = useAlertIdModalStore();

  const {
    isOpen: isPwOpen,
    closeModal: closePwModal,
    openModal: openPwModal,
  } = useAlertPasswordModalStore();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const onsubmitId = (data: FormValues) => {
    console.log(data);
    openIdModal();
  };

  const onsubmitPassword = (data: FormValues) => {
    console.log(data);
    openPwModal();
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
      onClick={handleClose}
    >
      <div
        className="relative h-536 w-632 rounded-24 border-2 border-orange-400 bg-beige-200 p-24 shadow-lg"
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
        <div className="flex items-center justify-center gap-8 text-20 font-bold">
          {type === 'id' ? <p>아이디</p> : <p>비밀번호</p>}
          <p>찾기</p>
        </div>
        {type === 'id' ? (
          <form
            onSubmit={handleSubmit(onsubmitId)}
            className="mt-30 flex h-420 w-full flex-col items-center justify-center gap-30 rounded-20 bg-white p-30"
          >
            <div className="relative flex w-full items-end gap-16">
              <div className="w-full">
                <Controller
                  name="email"
                  control={control}
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
                  <p className="absolute left-3 text-13 text-red-400">{errors.email.message}</p>
                )}
              </div>
              <Button
                label="인증번호 전송"
                variant="outlinePrimary"
                className="h-40 w-105 flex-shrink-0 text-12 font-bold"
              />
            </div>

            <div className="relative flex w-full items-end gap-16">
              <div className="w-full">
                <Controller
                  name="emailConfirm"
                  control={control}
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
                  <p className="absolute left-3 text-13 text-red-400">
                    {errors.emailConfirm.message}
                  </p>
                )}
              </div>
              <Button
                label="인증하기"
                variant="outlinePrimary"
                className="h-40 w-105 flex-shrink-0 text-12 font-bold"
              />
            </div>

            <Button label="찾기" type="submit" className="h-40 w-120" />
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onsubmitPassword)}
            className="mt-30 flex h-420 w-full flex-col items-center justify-center gap-30 rounded-20 bg-white p-24"
          >
            <div className="relative w-full">
              <Controller
                name="id"
                control={control}
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
                <p className="absolute left-3 text-13 text-red-400">{errors.id.message}</p>
              )}
            </div>

            <div className="relative flex w-full items-end gap-16">
              <div className="w-full">
                <Controller
                  name="email"
                  control={control}
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
                  <p className="absolute left-3 text-13 text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <Button label="찾기" type="submit" className="h-40 w-120" />
          </form>
        )}
      </div>
      <AlertModal message="아이디는 000000입니다." isOpen={isIdOpen} onClose={closeIdModal} />
      <AlertModal
        message="해당 이메일로 비밀번호를 전송했습니다."
        isOpen={isPwOpen}
        onClose={closePwModal}
      />
    </div>
  );
}
