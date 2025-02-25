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
    <div className='bg-red-300 w-64 transform duration-500 h-screen'>
      <div className='fixed top-0 left-0 bg-blue-300'>
        <button
          onClick={() => {
            setSidebarOpen(!SidebarOpen);
          }}
        >
          Sidebar
        </button>
      </div>
    </div>
  );
};

export default SideBar;
