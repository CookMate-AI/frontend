import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { FormValues } from '@/types/editProfile';
import { Controller, useForm } from 'react-hook-form';
import usePasswordStore from '@/stores/usePasswordStore';
import { useState } from 'react';

export default function EditProfile() {
  const {
    control,
    // register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { isOpen, openPasswordEdit } = usePasswordStore();
  const [isNicknameChange, setIsNicknameChange] = useState(true);

  const onsubmit = (data: FormValues) => {
    console.log(data);
    alert('개인정보 수정이 완료되었습니다.');
  };

  const handleNicknameChange = () => {
    setIsNicknameChange(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="relative flex h-full flex-col gap-30 px-60 py-50"
    >
      <Input type="text" label="아이디" value="id123" disabled />

      <Input type="text" label="이메일" value="email@mail.com" disabled />

      <div className="relative flex items-end gap-20">
        <div className="w-full">
          <Controller
            name="nickname"
            control={control}
            rules={{
              required: '닉네임을 입력해 주세요.',
              validate: (value) => {
                const isValid = /^[A-Za-z0-9가-힣]{2,8}$/.test(value);
                const forbiddenWords = [
                  'null',
                  'undefined',
                  'true',
                  'false',
                  'nan',
                  'admin',
                  'user',
                  'fuck',
                ];

                if (!isValid) {
                  return '닉네임은 2자 이상 8자 이하입니다. (특수문자 사용 불가)';
                }
                if (forbiddenWords.some((word) => value.toLowerCase().includes(word))) {
                  return '닉네임에 유효하지 않은 단어를 사용할 수 없습니다.';
                }
                return true;
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="닉네임"
                placeholder={
                  isNicknameChange
                    ? '닉네임을 변경하려면 버튼을 눌러주세요.'
                    : '닉네임을 입력해 주세요.'
                }
                error={!!errors.nickname}
                disabled={isNicknameChange}
              />
            )}
          />
          {errors.nickname && (
            <p className="absolute left-3 text-13 text-red-400">{errors.nickname.message}</p>
          )}
        </div>
        {isNicknameChange ? (
          <Button
            label="변경"
            className="h-50 w-140 text-14 font-bold"
            onClick={handleNicknameChange}
          />
        ) : (
          <Button label="중복확인" className="h-50 w-140 text-14 font-bold" variant="secondary" />
        )}
      </div>

      <div className="relative flex items-end gap-20">
        <div className="w-full">
          <Controller
            name="password"
            control={control}
            rules={{
              required: '비밀번호를 입력해 주세요.',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: '비밀번호가 영문, 숫자 포함 8자 이상이 되도록 해 주세요.',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                label="현재 비밀번호"
                placeholder="현재 비밀번호를 입력해 주세요."
                error={!!errors.password}
              />
            )}
          />
          {errors.password && (
            <p className="absolute left-3 text-13 text-red-400">{errors.password.message}</p>
          )}
        </div>
        <Button label="변경" className="h-50 w-140 text-14 font-bold" onClick={openPasswordEdit} />
      </div>

      {isOpen && (
        <>
          <div className="relative">
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: '새 비밀번호를 입력해 주세요.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: '비밀번호가 영문, 숫자 포함 8자 이상이 되도록 해 주세요.',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="새 비밀번호"
                  placeholder="새 비밀번호를 입력해 주세요."
                  error={!!errors.newPassword}
                />
              )}
            />
            {errors.newPassword && (
              <p className="absolute left-3 text-13 text-red-400">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="relative">
            <Controller
              name="passwordConfirm"
              control={control}
              rules={{
                required: '비밀번호를 확인해 주세요.',
                validate: (value) =>
                  value === watch('newPassword') || '비밀번호가 일치하지 않습니다.',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="비밀번호 확인"
                  placeholder="비밀번호를 한 번 더 입력해 주세요."
                  error={!!errors.passwordConfirm}
                />
              )}
            />
            {errors.passwordConfirm && (
              <p className="absolute left-3 text-13 text-red-400">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        </>
      )}

      <Button
        label="저장하기"
        type="submit"
        className="absolute bottom-30 left-1/2 mt-20 h-50 w-140 -translate-x-1/2 transform text-20"
      />
    </form>
  );
}
