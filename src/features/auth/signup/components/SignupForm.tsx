import type React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { SignupFormValues } from '../types';
import {
  emailConfirmRules,
  emailRules,
  idRules,
  passwordConfirmRules,
  passwordRules,
} from '../validation/signupValidation';

interface SignupFormProps {
  control: Control<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;

  onCheckUserId: () => Promise<void>;
  onCheckEmail: () => Promise<void>;
  onCheckEmailCertification: () => Promise<void>;
}

export function SignupForm({
  control,
  errors,
  onSubmit,
  onCheckUserId,
  onCheckEmail,
  onCheckEmailCertification,
}: SignupFormProps) {
  return (
    <form onSubmit={onSubmit} className="mt-70 flex flex-col gap-30">

      <div className="relative flex items-end gap-20">
        <div className="w-full">
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

        <Button
          label="중복확인"
          variant="outlinePrimary"
          className="h-50 w-100 text-12 font-bold lg:w-140 lg:text-14"
          onClick={onCheckUserId}
        />
      </div>

      <div className="relative flex items-end gap-20">
        <div className="w-full">
          <Controller
            name="email"
            control={control}
            rules={emailRules}
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
              {errors.email.message as string}
            </p>
          )}
        </div>

        <Button
          label="인증번호 전송"
          variant="outlinePrimary"
          className="h-50 w-100 text-12 font-bold lg:w-140 lg:text-14"
          onClick={onCheckEmail}
        />
      </div>

      <div className="relative flex items-end gap-20">
        <div className="w-full">
          <Controller
            name="emailConfirm"
            control={control}
            rules={emailConfirmRules}
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
              {errors.emailConfirm.message as string}
            </p>
          )}
        </div>

        <Button
          label="인증하기"
          variant="outlinePrimary"
          className="h-50 w-100 text-12 font-bold lg:w-140 lg:text-14"
          onClick={onCheckEmailCertification}
        />
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

      <div className="relative">
        <Controller
          name="passwordConfirm"
          control={control}
          rules={passwordConfirmRules(control._formValues.password)}
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

      <div className="flex items-center gap-10">
        <Controller
          name="agree"
          control={control}
          rules={{ required: '약관에 동의해야 합니다.' }}
          render={({ field }) => (
            <input
              type="checkbox"
              className="h-20 w-20"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        />

        <span
          className={errors.agree ? 'text-11 text-red-400 lg:text-13' : 'text-13 text-gray-700'}
        >
          개인정보 처리방침에 동의합니다.
        </span>
      </div>

      <Button
        label="가입하기"
        type="submit"
        className="absolute bottom-50 left-1/2 mt-20 h-50 w-150 -translate-x-1/2 transform text-16 lg:w-180 lg:text-20"
      />
    </form>
  );
}
