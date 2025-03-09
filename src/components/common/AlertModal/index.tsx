import { useFindIdModalStore, useFindPasswordModalStore } from '@/stores/useModalStore';
import Button from '../Button';

interface AlertModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  unitClose?: boolean;
  onClick?: () => void;
  okCancle?: boolean;
}

export default function AlertModal({
  message,
  isOpen,
  onClose,
  unitClose,
  onClick,
  okCancle,
}: AlertModalProps) {
  const { closeModal: closeFindModal } = useFindIdModalStore();
  const { closeModal: closePwFindModal } = useFindPasswordModalStore();

  const handleClose = () => {
    onClose();
    closeFindModal();
    closePwFindModal();
  };

  const handleUnit = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-336 w-432 rounded-24 border-2 border-orange-400 bg-beige-200 p-24 shadow-lg">
        <div className="flex h-full w-full flex-col items-center justify-center gap-20 rounded-20 bg-gray-50 p-24">
          <div className="text-center">{message}</div>
          <div className="absolute bottom-45 flex justify-center gap-10">
            {okCancle ? (
              <>
                <Button
                  label="취소"
                  className="h-30 w-100 text-12"
                  variant="secondary"
                  onClick={onClose}
                />
                <Button
                  label="확인"
                  className="h-30 w-100 text-12"
                  onClick={() => {
                    if (onClick) onClick();
                    handleClose();
                  }}
                />
              </>
            ) : unitClose ? (
              <Button label="확인" className="h-30 w-100 text-12" onClick={handleUnit} /> // 모달 창 하나 닫기
            ) : (
              <Button label="확인" className="h-30 w-100 text-12" onClick={handleClose} /> // 모달 창 전체 닫기
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
