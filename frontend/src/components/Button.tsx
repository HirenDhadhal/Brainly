import { ReactElement } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  text: string;
  StartIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
}

const VariantOptions = {
  primary: 'bg-indigo-600 hover:bg-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/30 hover:shadow-purple-500/50',
  secondary: 'bg-gray-800/50 hover:bg-gray-800 text-white border-purple-500/30 hover:border-purple-500/50 backdrop-blur-sm',
};

const defaultStyles = 'px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 border hover:scale-105 active:scale-95';

const Button = ({
  variant,
  text,
  StartIcon,
  onClick,
  fullWidth,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${VariantOptions[variant]} 
        ${defaultStyles}
        ${fullWidth ? 'w-full justify-center' : ''}
      `}
    >
      {StartIcon && (
        <span className="flex items-center justify-center">
          {StartIcon}
        </span>
      )}
      <span>{text}</span>
    </button>
  );
};

export default Button;