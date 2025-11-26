// components/ui/AlertModal.tsx

import Button from '../Button';

interface AlertModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  unitClose?: boolean; // true = AlertModal만 닫기, false = 부모 모달까지 닫기
}

export default function AlertModal({
  message,
  isOpen,
  onClose,
  // unitClose = false,
}: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/40"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-300 w-360 rounded-24 border-2 border-orange-400 bg-white p-24 shadow-lg">
        <div className="text-center text-16">{message}</div>

        <div className="mt-30 flex justify-center">
          <Button label="확인" className="h-35 w-120 text-14" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
