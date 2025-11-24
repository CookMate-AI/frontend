import Image from 'next/image';

import AlertModal from '@/components/ui/AlertModal';
import {
  useAlertIdEmailModalStore,
  useAlertIdModalStore,
  useAlertPasswordModalStore,
} from '@/stores/ui/useModalStore';

import { useFindId } from '../hooks/useFindId';
import { useFindPassword } from '../hooks/useFindPassword';
import { FindIdForm } from './FindIdForm';
import { FindPasswordForm } from './FindPasswordForm';

interface FindModalProps {
  type: 'id' | 'password';
  isModalOpen: boolean;
  onClose: () => void;
}

export default function FindModal({ type, isModalOpen, onClose }: FindModalProps) {
  const idHook = useFindId();
  const pwHook = useFindPassword();

  const { isOpen: isIdEmailOpen, closeModal: closeIdEmail } = useAlertIdEmailModalStore();
  const { isOpen: isIdResultOpen, closeModal: closeIdResult } = useAlertIdModalStore();
  const { isOpen: isPwResultOpen, closeModal: closePwResult } = useAlertPasswordModalStore();

  if (!isModalOpen) return null;

  const handleCloseModal = () => {
    if (type === 'id') idHook.closeModal();
    if (type === 'password') pwHook.closeModal();

    onClose();
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
      onClick={handleCloseModal}
    >
      <div
        className="relative h-436 w-400 rounded-24 border-2 border-orange-400 bg-beige-200 p-24 shadow-lg lg:h-536 lg:w-632"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/icons/ic-close.svg"
          alt="close"
          width={18}
          height={18}
          className="absolute right-24 cursor-pointer"
          onClick={handleCloseModal}
        />

        <h2 className="flex items-center justify-center gap-8 text-16 font-bold lg:text-20">
          {type === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
        </h2>

        {type === 'id' ? <FindIdForm {...idHook} /> : <FindPasswordForm {...pwHook} />}

        <AlertModal
          isOpen={isIdEmailOpen}
          onClose={closeIdEmail}
          message="해당 이메일로 인증번호가 전송되었습니다."
          unitClose
        />

        <AlertModal
          isOpen={isIdResultOpen}
          onClose={() => {
            closeIdResult();
            idHook.closeModal();
          }}
          message={idHook.resultMessage}
          unitClose={idHook.isClose}
        />

        <AlertModal
          isOpen={isPwResultOpen}
          onClose={() => {
            closePwResult();
            pwHook.closeModal();
          }}
          message={pwHook.resultMessage}
          unitClose={pwHook.isClose}
        />
      </div>
    </div>
  );
}
