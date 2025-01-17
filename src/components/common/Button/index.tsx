interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'disabled';
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  const baseStyles = 'p-16 text-white rounded-20';
  const variantStyles = {
    primary: 'bg-orange-400 hover:bg-orange-300',
    secondary: 'bg-mint-500 hover:bg-mint-400',
    disabled: 'bg-gray-300 cursor-not-allowed',
  };

  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <button onClick={onClick} className={`${baseStyles} ${styles}`}>
      {label}
    </button>
  );
}
