import React from 'react';

const Input = ({
  onChange,
  placeholder,
}: {
  onChange: () => void;
  placeholder: String;
}) => {
  return (
    <div>
      <input
        type={'text'}
        placeholder={placeholder}
        className='px-4 py-2 border rounded'
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
