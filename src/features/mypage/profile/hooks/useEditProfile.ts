import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { deleteSecession, getCheckNickname, getInfo, postPw, putInfo } from '@/lib/api/edit';
import usePasswordStore from '@/stores/auth/usePasswordStore';
import useNicknameStore from '@/stores/nickname/useNicknameStore';
import { useDeleteAccountModal } from '@/stores/ui/useModalStore';

import { ChangeUserData, FormValues, UserInfoData } from '../types';

export function useEditProfile() {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { isOpen: isPasswordEditOpen, openPasswordEdit, closePasswordEdit } = usePasswordStore();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useDeleteAccountModal();

  const [isNicknameChange, setIsNicknameChange] = useState(true);
  const [nicknameChangeSuccess, setNicknameChangeSuccess] = useState(false);
  const [infoData, setInfoData] = useState<UserInfoData | null>(null);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const { setNickname } = useNicknameStore();

  // const watchPassword = watch('password');
  const watchNewPassword = watch('newPassword');
  const watchPasswordConfirm = watch('passwordConfirm');

  const isFormValid =
    nicknameChangeSuccess ||
    (isPasswordEditOpen &&
      isPasswordVerified &&
      !!watchNewPassword &&
      !!watchPasswordConfirm &&
      watchNewPassword === watchPasswordConfirm);

  const resetFormState = useCallback(() => {
    setIsNicknameChange(true);
    setNicknameChangeSuccess(false);
    setIsPasswordVerified(false);

    reset({
      nickname: infoData?.nickName || '',
      password: '',
      newPassword: '',
      passwordConfirm: '',
    });
  }, [infoData, reset]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const result = await getInfo();
        setInfoData(result);
        setNickname(result?.nickName || '');

        reset({
          nickname: result?.nickName || '',
          password: '',
          newPassword: '',
          passwordConfirm: '',
        });
      } catch (error) {
        console.error('사용자 정보 가져오기 중 에러 발생', error);
      }
    };

    fetchUserInfo();
  }, [reset, updateTrigger, setNickname]);

  const handleNicknameChange = () => {
    setIsNicknameChange(false);
    setNicknameChangeSuccess(false);
  };

  const checkNickname = useCallback(async () => {
    const userNickname = watch('nickname');

    if (userNickname === infoData?.nickName) {
      alert('현재 닉네임과 동일합니다.');
      return;
    }

    const isValid = await trigger('nickname');
    if (!isValid) return;

    try {
      const result = await getCheckNickname(userNickname);
      alert(`${result.message}. 저장하기 버튼을 눌러 저장하세요.`);
      setNicknameChangeSuccess(true);
      setIsNicknameChange(true);
    } catch (error) {
      console.error('닉네임 중복 확인 중 에러 발생', error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data?.message || '닉네임 중복 확인 중 오류가 발생했습니다.');
      } else {
        alert('닉네임 중복 확인 중 오류가 발생했습니다.');
      }
    }
  }, [infoData?.nickName, trigger, watch]);

  const checkPwMatch = useCallback(async () => {
    const userPw = watch('password');

    const isValid = await trigger('password');
    if (!isValid) return;

    try {
      const result = await postPw(userPw);

      if (result && result.isSuccess === false) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      setIsPasswordVerified(true);
      openPasswordEdit();
    } catch (error) {
      console.log('에러 상세 정보:', error);

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          alert('비밀번호가 일치하지 않습니다.');
        } else {
          alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      } else {
        console.error('비밀번호 일치 확인 중 에러 발생', error);
        alert('비밀번호 확인 중 오류가 발생했습니다.');
      }
    }
  }, [openPasswordEdit, trigger, watch]);

  const onSubmitForm = useCallback(
    async (data: FormValues) => {
      let apiData: ChangeUserData = {
        num: 0,
        nickName: infoData?.nickName || '',
        userPw: '',
      };

      if (nicknameChangeSuccess && !isPasswordEditOpen) {
        apiData = {
          num: 1,
          nickName: data.nickname,
          userPw: '',
        };
      } else if (!nicknameChangeSuccess && isPasswordEditOpen && isPasswordVerified) {
        apiData = {
          num: 2,
          nickName: infoData?.nickName || '',
          userPw: data.newPassword,
        };
      } else if (nicknameChangeSuccess && isPasswordEditOpen && isPasswordVerified) {
        apiData = {
          num: 3,
          nickName: data.nickname,
          userPw: data.newPassword,
        };
      }

      try {
        await putInfo(apiData);
        setNickname(data.nickname);
        alert('개인정보 수정이 완료되었습니다.');

        resetFormState();
        setUpdateTrigger((prev) => prev + 1);
        closePasswordEdit();
      } catch (error) {
        console.error('개인정보 수정 중 에러 발생', error);
        alert('개인정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
    [
      closePasswordEdit,
      infoData?.nickName,
      isPasswordEditOpen,
      isPasswordVerified,
      nicknameChangeSuccess,
      resetFormState,
      setNickname,
    ],
  );

  const deleteAccount = useCallback(async () => {
    try {
      await deleteSecession();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userNickname');
      alert('회원 탈퇴가 완료되었습니다.');
      window.location.href = '/';
    } catch (error) {
      console.error('회원 탈퇴 중 에러 발생', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    } finally {
      closeDeleteModal();
    }
  }, [closeDeleteModal]);

  return {
    control,
    handleSubmit,
    errors,
    infoData,
    isNicknameChange,
    nicknameChangeSuccess,
    handleNicknameChange,
    checkNickname,
    isPasswordEditOpen,
    isPasswordVerified,
    checkPwMatch,
    isFormValid,
    onSubmitForm,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    deleteAccount,
  };
}
