import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Controller, useForm } from 'react-hook-form';
import { FormValues } from '@/types/signup';

export default function Signup() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onsubmit = (data: FormValues) => {
    console.log(data);
    alert('회원가입이 완료되었습니다.');
  };

  return (
    <div className="flex min-h-screen justify-center bg-beige-200 pt-100 pb-20">
      <div className="relative h-940 w-650 rounded-24 bg-white px-30 py-60 shadow-md">
        <h1 className="text-center text-30 font-bold text-gray-800">회원가입</h1>
        <form onSubmit={handleSubmit(onsubmit)} className="mt-70 flex flex-col gap-30">
          <div className="relative">
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

          <div className="relative flex items-end gap-20">
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
              className="h-45 w-140 text-14 font-bold"
            />
          </div>

          <div className="relative flex items-end gap-20">
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
              className="h-45 w-140 text-14 font-bold"
            />
          </div>

          <div className="relative">
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
                  label="비밀번호"
                  placeholder="비밀번호를 입력해 주세요."
                  error={!!errors.password}
                />
              )}
            />
            {errors.password && (
              <p className="absolute left-3 text-13 text-red-400">{errors.password.message}</p>
            )}
          </div>

          <div className="relative">
            <Controller
              name="passwordConfirm"
              control={control}
              rules={{
                required: '비밀번호를 확인해 주세요.',
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
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

          <div className="mt-20 flex items-center gap-10">
            <input
              type="checkbox"
              id="agree"
              className="h-20 w-20"
              {...register('agree', { required: true })}
            />
            <label
              htmlFor="agree"
              className={errors.agree ? 'text-13 text-red-400' : 'text-13 text-gray-700'}
            >
              개인정보 수집 및 이용약관에 동의합니다.
            </label>
          </div>

          <Button
            label="가입하기"
            type="submit"
            className="absolute bottom-50 left-1/2 mt-20 h-50 w-180 -translate-x-1/2 transform text-20"
          />
        </form>
      </div>
    </div>
  );
}
