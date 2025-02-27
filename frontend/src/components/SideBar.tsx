import { BrainIcon } from '../icons/BrainIcon';
import TwitterIcon from '../icons/TwitterIcon';
import { YoutubeIcon } from '../icons/YoutubeIcon';
import SidebarItem from './SidebarItem';

interface SideBarProps {
  SidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({ SidebarOpen, setSidebarOpen }) => {
  if (!SidebarOpen) {
    return (
      <div className='fixed top-0 left-0 bg-blue-300 transform duration-500'>
        <button
          onClick={() => {
            setSidebarOpen(!SidebarOpen);
          }}
        >
          Sidebar
        </button>
      </div>
    );
  }

  return (
    <div className='w-64 h-screen border-r left-0 top-0 fixed pl-6'>
      <div className='pt-4'>
        {/* <button
          onClick={() => {
            setSidebarOpen(!SidebarOpen);
          }}
        >
          Sidebar
        </button> */}
        <div className='flex text-2xl pt-4 pl-6'>
          <div className='pr-2 text-purple-600'>
            <BrainIcon />
          </div>
          Brainly
        </div>
        <div className='p-2'>
          <SidebarItem text='Twitter' Icon={<TwitterIcon />} />
          <SidebarItem text='Youtube' Icon={<YoutubeIcon />} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
