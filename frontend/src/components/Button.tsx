import { ReactElement } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  text: string;
  StartIcon: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
}

const VariantOptions = {
  primary: 'bg-red-200',
  secondary: 'bg-blue-200',
};

const defaultStyles = 'px-4 py-2 rounded-md font-light flex items-center';

const Button = ({
  variant,
  text,
  StartIcon,
  onClick,
  fullWidth,
}: ButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={
          VariantOptions[variant] +
          ' ' +
          defaultStyles +
          `${fullWidth ? ' w-full flex justify-center items-center' : ''}`
        }
      >
        {StartIcon}
        {text}
      </button>
    </div>
  );
};

export default Button;
