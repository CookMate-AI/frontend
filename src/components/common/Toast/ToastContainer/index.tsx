import { useToastStore } from '@/stores/useToastStore';
import Toast from '..';

export default function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-50 left-1/2 -translate-x-1/2 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} />
      ))}
    </div>
  );
}
