import Button from '../Button';

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

export default function AlertModal({ message, onClose }: AlertModalProps) {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="relative h-336 w-432 rounded-24 border-2 border-orange-400 bg-beige-200 p-24 shadow-lg">
        <div className="flex h-full w-full flex-col items-center justify-center gap-20 rounded-20 bg-gray-50 p-24">
          <div>{message}</div>
          <div className="absolute bottom-45 flex justify-center gap-10">
            <Button label="확인" className="h-30 w-100 text-12" onClick={onClose} />
            {/* <Button label="취소" className="h-40 w-120" variant="secondary" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
