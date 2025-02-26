import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Controller, useForm } from 'react-hook-form';
import { FormValues } from '@/types/login';
import { useRouter } from 'next/router';
import FindModal from '@/components/Login/FindModal';
import { useFindIdModalStore, useFindPasswordModalStore } from '@/stores/useModalStore';
import { postLogin } from '@/lib/api/login';

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const {
    isOpen: isIdOpen,
    closeModal: closeIdModal,
    openModal: openIdModal,
  } = useFindIdModalStore();

  const {
    isOpen: isPwOpen,
    closeModal: closePwModal,
    openModal: openPwModal,
  } = useFindPasswordModalStore();

  const onsubmit = async (data: FormValues) => {
    try {
      const loginData = {
        username: data.id,
        password: data.password,
      };
      const result = await postLogin(loginData);
      if (result) {
        alert(result.message);
      }
      router.push('/');
    } catch (error) {
      console.error('로그인 중 에러 발생', error);
    }
    console.log(localStorage.getItem("token"));
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="flex justify-center pb-20 pt-60">
      <div className="relative h-640 w-650 rounded-24 bg-white px-30 py-60 shadow-md">
        <h1 className="text-center text-30 font-bold text-gray-800">로그인</h1>
        <form onSubmit={handleSubmit(onsubmit)} className="mt-70 flex flex-col gap-30">
          <div className="relative">
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
              <p className="absolute left-3 text-13 text-red-400">{errors.id.message}</p>
            )}
          </div>

          <div className="relative">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: '비밀번호를 입력해 주세요.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                  message: '비밀번호는 영문, 숫자 포함 8자 이상입니다.',
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

          <div className="absolute bottom-100 left-1/2 flex -translate-x-1/2 transform gap-10">
            <Button label="로그인" type="submit" className="h-50 w-140 text-20" />
            <Button
              label="회원가입"
              variant="secondary"
              className="h-50 w-140 text-20"
              onClick={handleSignup}
            />
          </div>

          <div className="absolute bottom-60 left-1/2 flex -translate-x-1/2 transform gap-10 text-14 text-gray-800">
            <div className="cursor-pointer" onClick={openIdModal}>
              아이디 찾기
            </div>
            <p>/</p>
            <div className="cursor-pointer" onClick={openPwModal}>
              비밀번호 찾기
            </div>
          </div>
        </form>
      </div>
      <FindModal type="id" isModalOpen={isIdOpen} onClose={closeIdModal} />
      <FindModal type="password" isModalOpen={isPwOpen} onClose={closePwModal} />
    </div>
  );
}
