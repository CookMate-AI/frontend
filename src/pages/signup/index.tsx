import { SignupForm } from '@/features/auth/signup/components/SignupForm';
import { useSignup } from '@/features/auth/signup/hooks/useSignup';

export default function SignupPage() {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    onCheckUserId,
    onCheckEmail,
    onCheckEmailCertification,
  } = useSignup();

  return (
    <div className="flex justify-center pb-20 pt-60">
      <div className="relative h-880 lg:h-940 w-400 rounded-24 bg-white px-30 py-40 lg:py-60 shadow-md lg:w-650">
        <h1 className="text-center text-20 font-bold text-gray-800 lg:text-30">회원가입</h1>

        <SignupForm
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          onCheckUserId={onCheckUserId}
          onCheckEmail={onCheckEmail}
          onCheckEmailCertification={onCheckEmailCertification}
        />
      </div>
    </div>
  );
}
