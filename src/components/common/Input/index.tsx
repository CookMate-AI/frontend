import classNames from 'classnames';

type InputProps = {
  type: string;
  placeholder?: string;
  successMessage?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
};

export default function Input({
  type,
  placeholder,
  successMessage,
  error,
  errorMessage,
  disabled,
  className,
}: InputProps) {
  const baseStyles = classNames(
    'h-55 w-full rounded-12 border border-gray-200 bg-gray-100 px-16 text-gray-500 outline-none focus:border-gray-300',
    {
      'bg-red-200 border-red-200 focus:border-red-300': error,
      'bg-gray-200 cursor-not-allowed': disabled,
    },
    className,
  );

  return (
    <>
      <input type={type} className={baseStyles} placeholder={placeholder} disabled={disabled} />
      {error && <p className="pl-5 text-red-500">{errorMessage || 'error'}</p>}
      {successMessage && <p className="pl-5 text-green-500">{successMessage || 'success'}</p>}
    </>
  );
}
