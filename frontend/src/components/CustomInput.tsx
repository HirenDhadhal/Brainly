import React from "react";

type InputProps = {
  reference?: React.RefObject<HTMLInputElement | null>;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const CustomInput: React.FC<InputProps> = ({ reference, placeholder, onChange, onKeyDown }) => {
  return (
    <input
      ref={reference}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="border px-3 py-2 rounded w-full"
    />
  );
};

export default CustomInput;