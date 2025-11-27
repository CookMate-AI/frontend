import { Control, Controller, FieldErrors } from 'react-hook-form';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { FormValues, UserInfoData } from '../types';

interface EditProfileFormProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  infoData: UserInfoData | null;

  isNicknameChange: boolean;
  nicknameChangeSuccess: boolean;
  isPasswordEditOpen: boolean;
  isPasswordVerified: boolean;
  isFormValid: boolean;

  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onNicknameChangeClick: () => void;
  onCheckNickname: () => void;
  onCheckPwMatch: () => void;
  onOpenDeleteModal: () => void;
}

export function EditProfileForm({
  control,
  errors,
  infoData,
  isNicknameChange,
  nicknameChangeSuccess,
  isPasswordEditOpen,
  isPasswordVerified,
  isFormValid,
  onSubmit,
  onNicknameChangeClick,
  onCheckNickname,
  onCheckPwMatch,
  onOpenDeleteModal,
}: EditProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="relative flex h-full flex-col gap-30 px-60 py-50">
      <Input type="text" label="아이디" value={infoData?.userId || ''} disabled />
      <Input type="text" label="이메일" value={infoData?.email || ''} disabled />

      <div className="relative flex items-end gap-10 lg:gap-20">
        <div className="w-full">
          <Controller
            name="nickname"
            control={control}
            defaultValue=""
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
                  isNicknameChange ? infoData?.nickName || '' : '새 닉네임을 입력해 주세요.'
                }
                error={!!errors.nickname}
                disabled={isNicknameChange}
              />
            )}
          />
          {errors.nickname && (
            <p className="absolute left-3 text-11 text-red-400 lg:text-13">
              {errors.nickname.message as string}
            </p>
          )}
        </div>

        {isNicknameChange ? (
          <Button
            label="변경"
            className="h-40 w-90 text-12 font-bold lg:h-50 lg:w-140 lg:text-14"
            onClick={onNicknameChangeClick}
          />
        ) : (
          <Button
            label="중복확인"
            className="h-40 w-90 text-12 font-bold lg:h-50 lg:w-140 lg:text-14"
            onClick={onCheckNickname}
            variant={nicknameChangeSuccess ? 'disabled' : 'secondary'}
          />
        )}
      </div>

      <div className="relative flex items-end gap-10 lg:gap-20">
        <div className="w-full">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: isPasswordEditOpen ? '비밀번호를 입력해 주세요.' : false,
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{8,}$/,
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
                disabled={isPasswordVerified}
              />
            )}
          />
          {errors.password && (
            <p className="absolute left-3 text-11 text-red-400 lg:text-13">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <Button
          label={isPasswordVerified ? '확인됨' : '변경'}
          className="h-40 w-90 text-12 font-bold lg:h-50 lg:w-140 lg:text-14"
          onClick={onCheckPwMatch}
          variant={isPasswordVerified ? 'disabled' : 'primary'}
          disabled={isPasswordVerified}
        />
      </div>

      {isPasswordEditOpen && (
        <>
          <div className="relative">
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              rules={{
                required: '새 비밀번호를 입력해 주세요.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: '비밀번호가 영문, 숫자 포함 8자 이상이 되도록 해 주세요.',
                },
                validate: (value, formValues) =>
                  value !== formValues.password ||
                  '현재 비밀번호와 같은 비밀번호로 변경할 수 없습니다.',
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
              <p className="absolute left-3 text-11 text-red-400 lg:text-13">
                {errors.newPassword.message as string}
              </p>
            )}
          </div>

          <div className="relative">
            <Controller
              name="passwordConfirm"
              control={control}
              defaultValue=""
              rules={{
                required: '비밀번호를 확인해 주세요.',
                validate: (value, formValues) =>
                  value === formValues.newPassword || '비밀번호가 일치하지 않습니다.',
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
              <p className="absolute left-3 text-11 text-red-400 lg:text-13">
                {errors.passwordConfirm.message as string}
              </p>
            )}
          </div>
        </>
      )}

      <Button
        label="저장하기"
        type="submit"
        className="absolute bottom-30 left-1/2 mt-20 h-45 w-100 -translate-x-1/2 transform text-16 lg:h-50 lg:w-140 lg:text-20"
        variant={isFormValid ? 'primary' : 'disabled'}
        disabled={!isFormValid}
      />

      <div
        className="absolute bottom-7 right-10 cursor-pointer text-12 text-gray-400"
        onClick={onOpenDeleteModal}
      >
        회원탈퇴
      </div>
    </form>
  );
}
