import type React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { LoginFormValues } from '../types';
import { idRules, passwordRules } from '../validation/loginValidation';

interface LoginFormProps {
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onSignup: () => void;
  openIdModal: () => void;
  openPwModal: () => void;
}

export function LoginForm({
  control,
  errors,
  onSubmit,
  onSignup,
  openIdModal,
  openPwModal,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="mt-70 flex flex-col gap-30">
      <div className="relative">
        <Controller
          name="id"
          control={control}
          rules={idRules}
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
            {errors.id.message as string}
          </p>
        )}
      </div>

      <div className="relative">
        <Controller
          name="password"
          control={control}
          rules={passwordRules}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요."
              error={!!errors.password}
            />
          )}
        />
        {errors.password && (
          <p className="absolute left-3 text-11 text-red-400 lg:text-13">
            {errors.password.message as string}
          </p>
        )}
      </div>

      <div className="absolute bottom-100 left-1/2 flex -translate-x-1/2 transform gap-10">
        <Button label="로그인" type="submit" className="h-50 w-100 text-16 lg:w-140 lg:text-20" />
        <Button
          label="회원가입"
          variant="secondary"
          className="h-50 w-100 text-16 lg:w-140 lg:text-20"
          onClick={onSignup}
        />
      </div>
      
      <div className="absolute bottom-60 left-1/2 flex -translate-x-1/2 transform gap-10 text-13 text-gray-800 lg:text-14">
        <button type="button" className="cursor-pointer" onClick={openIdModal}>
          아이디 찾기
        </button>
        <p>/</p>
        <button type="button" className="cursor-pointer" onClick={openPwModal}>
          비밀번호 찾기
        </button>
      </div>
    </form>
  );
}
