import Button from '../Button';

interface AlertModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  unitClose?: boolean;
}

export default function AlertModal({ message, isOpen, onClose }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative flex h-250 flex-col items-center justify-between rounded-20 border-2 border-orange-400 bg-white p-30 lg:w-400"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-1 items-center justify-center text-center text-16">{message}</div>

        <div className="flex justify-center">
          <Button label="확인" className="h-35 w-120 text-14" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
