// features/auth/find/components/FindIdForm.tsx
import { Control, Controller, FieldErrors } from 'react-hook-form';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { FindFormValues } from '../types';
import { emailRules } from '../validation/findValidation';

interface FindIdFormProps {
  control: Control<FindFormValues>;
  errors: FieldErrors<FindFormValues>;
  onSendEmail: () => void;
  onVerifyCode: () => void;
}

export function FindIdForm({ control, errors, onSendEmail, onVerifyCode }: FindIdFormProps) {
  return (
    <div className="mt-30 flex h-320 w-full flex-col items-center justify-center gap-30 rounded-20 bg-white p-30 lg:h-420">
      {/* 이메일 입력 + 인증번호 전송 버튼 */}
      <div className="relative flex w-full items-end gap-16">
        <Controller
          name="email"
          control={control}
          rules={emailRules}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              label="이메일"
              error={!!errors.email}
              placeholder="이메일을 입력해 주세요."
            />
          )}
        />
        <Button
          label="인증번호 전송"
          onClick={onSendEmail}
          variant="outlinePrimary"
          className="h-40 w-80 flex-shrink-0 text-12 font-bold lg:w-105"
        />
      </div>

      {/* 인증번호 입력 + 인증 버튼 */}
      <div className="relative flex w-full items-end gap-16">
        <Controller
          name="emailConfirm"
          control={control}
          rules={{ required: '인증번호를 입력해 주세요.' }}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="인증번호"
              error={!!errors.emailConfirm}
              placeholder="인증번호를 입력해 주세요."
            />
          )}
        />
        <Button
          label="인증하기"
          onClick={onVerifyCode}
          variant="outlinePrimary"
          className="h-40 w-80 flex-shrink-0 text-12 font-bold lg:w-105"
        />
      </div>
    </div>
  );
}
