import Button from '@/components/ui/Button';

export function StartButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      label="이용하기"
      onClick={onClick}
      className="fixed bottom-80 right-30 animate-bounce lg:bottom-20 lg:h-64 lg:w-180 lg:text-24"
    />
  );
}
