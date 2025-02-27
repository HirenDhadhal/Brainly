import { ReactElement } from 'react';

const SidebarItem = ({ text, Icon }: { text: string; Icon: ReactElement }) => {
  return (
    <div className='flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4'>
      <div className='pr-2'> {Icon}</div>
      <div>{text}</div>
    </div>
  );
};

export default SidebarItem;
