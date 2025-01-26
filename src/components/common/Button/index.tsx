interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?:
    | 'primary'
    | 'secondary'
    | 'disabled'
    | 'outlinePrimary'
    | 'outlineSecondary'
    | 'outlineDisabled';
  className?: string;
}

export default function Button({
  label,
  type = 'button',
  onClick,
  variant = 'primary',
  className,
}: ButtonProps) {
  const baseStyles = 'p-16 text-white rounded-20 flex items-center justify-center';
  const variantStyles = {
    primary: 'bg-orange-400 hover:bg-orange-300',
    secondary: 'bg-mint-500 hover:bg-mint-400',
    disabled: 'bg-gray-300 cursor-not-allowed',
    outlinePrimary:
      'bg-white border border-orange-400 !text-orange-400 hover:border-orange-300 hover:!text-orange-300',
    outlineSecondary:
      'bg-white border border-mint-500 !text-mint-500 hover:border-mint-400 hover:!text-mint-400',
    outlineDisabled: 'bg-white border border-gray-300 !text-gray-300 cursor-not-allowed',
  };

  const styles = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${className || ''}`;

  return (
    <button onClick={onClick} className={styles} type={type}>
      {label}
    </button>
  );
}
