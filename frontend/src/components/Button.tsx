import { ReactElement } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  text: string;
  StartIcon: ReactElement;
}

const VariantOptions = {
  primary: 'bg-red-200',
  secondary: 'bg-blue-200',
};

const defaultStyles = 'px-4 py-2 rounded-md font-light flex items-center';

const Button = ({ variant, text, StartIcon }: ButtonProps) => {
  return (
    <div>
      <button className={VariantOptions[variant] + ' ' + defaultStyles}>
        {StartIcon}
        {text}
      </button>
    </div>
  );
};

export default Button;
