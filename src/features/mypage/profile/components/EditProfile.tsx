import AlertModal from '@/components/ui/AlertModal';

import { useEditProfile } from '../hooks/useEditProfile';
import { EditProfileForm } from './EditProfileForm';

export default function EditProfile() {
  const {
    control,
    handleSubmit,
    errors,
    infoData,
    isNicknameChange,
    nicknameChangeSuccess,
    isPasswordEditOpen,
    isPasswordVerified,
    isFormValid,
    onSubmitForm,
    handleNicknameChange,
    checkNickname,
    checkPwMatch,
    isDeleteModalOpen,
    openDeleteModal,
    deleteAccount,
  } = useEditProfile();

  return (
    <>
      <EditProfileForm
        control={control}
        errors={errors}
        infoData={infoData}
        isNicknameChange={isNicknameChange}
        nicknameChangeSuccess={nicknameChangeSuccess}
        isPasswordEditOpen={isPasswordEditOpen}
        isPasswordVerified={isPasswordVerified}
        isFormValid={isFormValid}
        onSubmit={handleSubmit(onSubmitForm)}
        onNicknameChangeClick={handleNicknameChange}
        onCheckNickname={checkNickname}
        onCheckPwMatch={checkPwMatch}
        onOpenDeleteModal={openDeleteModal}
      />

      <AlertModal
        message="정말 탈퇴하실 건가요?"
        isOpen={isDeleteModalOpen}
        onClose={deleteAccount}
      />
    </>
  );
}
