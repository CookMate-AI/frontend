import { useRouter } from 'next/router';

import FindModal from '@/features/auth/find/components/FindModal';
import { LoginForm } from '@/features/auth/login/components/LoginForm';
import { useLogin } from '@/features/auth/login/hooks/useLogin';
import { useFindIdModalStore, useFindPasswordModalStore } from '@/stores/ui/useModalStore';

export default function Login() {
  const router = useRouter();
  const { control, handleSubmit, errors, onSubmit } = useLogin();

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

  const handleSignup = () => router.push('/signup');

  return (
    <div className="flex justify-center pb-20 pt-60">
      <div className="relative h-550 w-400 rounded-24 bg-white px-30 py-40 shadow-md lg:h-640 lg:w-650 lg:py-60">
        <h1 className="text-center text-20 font-bold text-gray-800 lg:text-30">로그인</h1>

        <LoginForm
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          onSignup={handleSignup}
          openIdModal={openIdModal}
          openPwModal={openPwModal}
        />
      </div>

      <FindModal type="id" isModalOpen={isIdOpen} onClose={closeIdModal} />
      <FindModal type="password" isModalOpen={isPwOpen} onClose={closePwModal} />
    </div>
  );
}
