// features/auth/find/components/FindPasswordForm.tsx

import { Control, Controller, FieldErrors } from 'react-hook-form';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { FindFormValues } from '../types';
import { emailRules, idRules } from '../validation/findValidation';

interface FindPasswordFormProps {
  control: Control<FindFormValues>;
  errors: FieldErrors<FindFormValues>;
  onFindPw: () => void;
}

export function FindPasswordForm({ control, errors, onFindPw }: FindPasswordFormProps) {
  return (
    <div className="mt-30 flex h-320 w-full flex-col items-center justify-center gap-30 rounded-20 bg-white p-30 lg:h-420">
      <div className="relative w-full">
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
      </div>

      <div className="relative w-full">
        <Controller
          name="email"
          control={control}
          rules={emailRules}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              label="이메일"
              placeholder="이메일을 입력해 주세요."
              error={!!errors.email}
            />
          )}
        />
      </div>

      <Button
        label="찾기"
        onClick={onFindPw}
        className="h-35 w-80 text-14 lg:h-40 lg:w-120 lg:text-16"
      />
    </div>
  );
}
