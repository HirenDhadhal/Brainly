import React from 'react';

const Input = ({
  onChange,
  placeholder,
  reference,
}: {
  onChange?: () => void;
  placeholder: String;
  reference?: any;
}) => {
  return (
    <div>
      <input
        type={'text'}
        ref={reference}
        placeholder={placeholder}
        className='px-4 py-2 border rounded'
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
