import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { FormValues, UserInfoData, ChangeUserData } from '@/types/editProfile';
import { Controller, useForm } from 'react-hook-form';
import usePasswordStore from '@/stores/usePasswordStore';
import { useState, useEffect } from 'react';
import { putInfo, getCheckNickname, getInfo, postPw } from '@/lib/api/edit';
import axios from 'axios';

export default function EditProfile() {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { isOpen, openPasswordEdit } = usePasswordStore();
  const [isNicknameChange, setIsNicknameChange] = useState(true);
  const [nicknameChangeSuccess, setNicknameChangeSuccess] = useState(false);
  const [infoData, setInfoData] = useState<UserInfoData | null>(null);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  // 폼 값 감시
  // const watchNickname = watch('nickname');
  const watchPassword = watch('password');
  const watchNewPassword = watch('newPassword');
  const watchPasswordConfirm = watch('passwordConfirm');

  // 제출 버튼 활성화 여부 계산
  const isFormValid = () => {
    // 닉네임만 변경 (케이스 1)
    if (nicknameChangeSuccess) {
      return true;
    }
    // 비밀번호만 변경 (케이스 2)
    else if (
      isOpen &&
      isPasswordVerified &&
      watchNewPassword &&
      watchPasswordConfirm &&
      watchNewPassword === watchPasswordConfirm
    ) {
      return true;
    }

    return false;
  };

  const onsubmit = async (data: FormValues) => {
    let apiData: ChangeUserData = {
      num: 0,
      nickName: infoData?.nickName || '',
      userPw: '',
    };

    if (nicknameChangeSuccess && !isOpen) {
      // 닉네임만 변경 (케이스 1)
      apiData = {
        num: 1,
        nickName: data.nickname,
        userPw: '',
      };
    } else if (!nicknameChangeSuccess && isOpen && isPasswordVerified) {
      // 비밀번호만 변경 (케이스 2)
      apiData = {
        num: 2,
        nickName: infoData?.nickName || '',
        userPw: data.newPassword, // newPassword가 userPw로 전송
      };
    } else if (nicknameChangeSuccess && isOpen && isPasswordVerified) {
      // 닉네임, 비밀번호 모두 변경 (케이스 3)
      apiData = {
        num: 3,
        nickName: data.nickname,
        userPw: data.newPassword, // newPassword가 userPw로 전송
      };
    }

    // API 호출 예시
    try {
      // 여기에 실제 API 호출 코드 추가
      await putInfo(apiData);
      console.log('제출 데이터:', apiData);
      alert('개인정보 수정이 완료되었습니다.');

      // 폼 초기화 및 상태 리셋
      resetFormState();
    } catch (error) {
      console.error('개인정보 수정 중 에러 발생', error);
      alert('개인정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const resetFormState = () => {
    setIsNicknameChange(true);
    setNicknameChangeSuccess(false);
    setIsPasswordVerified(false);
    reset({
      nickname: infoData?.nickName || '',
      password: '',
      newPassword: '',
      passwordConfirm: '',
    });
  };

  const handleNicknameChange = () => {
    setIsNicknameChange(false);
    setNicknameChangeSuccess(false);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const result = await getInfo();
        setInfoData(result);

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
  }, [reset]);

  const checkNickname = async () => {
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
  };

  const checkPwMatch = async () => {
    const userPw = watch('password');

    const isValid = await trigger('password');
    if (!isValid) return;

    try {
      const result = await postPw(userPw);
      console.log(result);

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
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="relative flex h-full flex-col gap-30 px-60 py-50"
    >
      <Input type="text" label="아이디" value={infoData?.userId || ''} disabled />

      <Input type="text" label="이메일" value={infoData?.email || ''} disabled />

      <div className="relative flex items-end gap-10 lg:gap-20">
        <div className="w-full">
          <Controller
            name="nickname"
            control={control}
            defaultValue=""
            rules={{
              required: '닉네임을 입력해 주세요.',
              validate: (value) => {
                const isValid = /^[A-Za-z0-9가-힣]{2,8}$/.test(value);
                const forbiddenWords = [
                  'null',
                  'undefined',
                  'true',
                  'false',
                  'nan',
                  'admin',
                  'user',
                  'fuck',
                ];

                if (!isValid) {
                  return '닉네임은 2자 이상 8자 이하입니다. (특수문자 사용 불가)';
                }
                if (forbiddenWords.some((word) => value.toLowerCase().includes(word))) {
                  return '닉네임에 유효하지 않은 단어를 사용할 수 없습니다.';
                }
                return true;
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="닉네임"
                placeholder={
                  isNicknameChange ? infoData?.nickName || '' : '새 닉네임을 입력해 주세요.'
                }
                error={!!errors.nickname}
                disabled={isNicknameChange}
              />
            )}
          />
          {errors.nickname && (
            <p className="absolute left-3 text-11 text-red-400 lg:text-13">
              {errors.nickname.message}
            </p>
          )}
        </div>
        {isNicknameChange ? (
          <Button
            label="변경"
            className="h-40 w-90 text-12 font-bold lg:h-50 lg:w-140 lg:text-14"
            onClick={handleNicknameChange}
          />
        ) : (
          <Button
            label="중복확인"
            className="h-40 w-90 text-12 font-bold lg:h-50 lg:w-140 lg:text-14"
            onClick={checkNickname}
            variant={nicknameChangeSuccess ? 'disabled' : 'secondary'}
          />
        )}
      </div>

      <div className="relative flex items-end gap-10 lg:gap-20">
        <div className="w-full">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: isOpen ? '비밀번호를 입력해 주세요.' : false,
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: '비밀번호가 영문, 숫자 포함 8자 이상이 되도록 해 주세요.',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                label="현재 비밀번호"
                placeholder="현재 비밀번호를 입력해 주세요."
                error={!!errors.password}
                disabled={isPasswordVerified}
              />
            )}
          />
          {errors.password && (
            <p className="absolute left-3 text-11 text-red-400 lg:text-13">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button
          label={isPasswordVerified ? '확인됨' : '변경'}
          className="h-40 w-90 text-12 font-bold lg:h-50 lg:w-140 lg:text-14"
          onClick={checkPwMatch}
          variant={isPasswordVerified ? 'disabled' : 'primary'}
          disabled={isPasswordVerified}
        />
      </div>

      {isOpen && (
        <>
          <div className="relative">
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              rules={{
                required: '새 비밀번호를 입력해 주세요.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: '비밀번호가 영문, 숫자 포함 8자 이상이 되도록 해 주세요.',
                },
                validate: (value) =>
                  value !== watchPassword || '현재 비밀번호와 같은 비밀번호로 변경할 수 없습니다.',
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="새 비밀번호"
                  placeholder="새 비밀번호를 입력해 주세요."
                  error={!!errors.newPassword}
                />
              )}
            />
            {errors.newPassword && (
              <p className="absolute left-3 text-11 text-red-400 lg:text-13">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Controller
              name="passwordConfirm"
              control={control}
              defaultValue=""
              rules={{
                required: '비밀번호를 확인해 주세요.',
                validate: (value) =>
                  value === watch('newPassword') || '비밀번호가 일치하지 않습니다.',
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
              <p className="absolute left-3 text-11 text-red-400 lg:text-13">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        </>
      )}

      <Button
        label="저장하기"
        type="submit"
        className="absolute bottom-30 left-1/2 mt-20 h-45 w-100 -translate-x-1/2 transform text-16 lg:h-50 lg:w-140 lg:text-20"
        variant={isFormValid() ? 'primary' : 'disabled'}
        disabled={!isFormValid()}
      />
    </form>
  );
}
