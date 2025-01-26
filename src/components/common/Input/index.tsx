import classNames from 'classnames';

type InputProps = {
  type: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export default function Input({
  type,
  label,
  placeholder,
  disabled,
  className,
  error,
  onChange,
  value,
}: InputProps) {
  const baseStyles = classNames(
    'h-55 w-full rounded-12 border border-gray-200 bg-gray-100 px-16 text-gray-500 outline-none focus:border-gray-300',
    {
      'bg-error border-error focus:border-red-200': error,
      'bg-gray-200 cursor-not-allowed': disabled,
    },
    className,
  );

  return (
    <>
      <label className="mb-4 ml-4 block text-sm text-gray-700">{label}</label>
      <input
        type={type}
        className={baseStyles}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
    </>
  );
}
