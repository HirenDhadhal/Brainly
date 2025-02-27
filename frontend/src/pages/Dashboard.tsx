import { useState } from 'react';
import '../App.css';
import Button from '../components/Button';
import Card from '../components/Card';
import CreateContentModal from '../components/CreateContentModal';
import SideBar from '../components/SideBar';
import PlusIcon from '../icons/PlusIcon';
import ShareIcon from '../icons/ShareIcon';

function Dashboard() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

  return (
    <div className='flex'>
      <SideBar SidebarOpen={setSideBarOpen} setSidebarOpen={setSideBarOpen} />
      <div className='p-4 ml-64 min-h-screen w-full bg-gray-300'>
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className='flex items-center justify-end gap-4'>
          <Button
            variant='primary'
            text='Share Brain'
            StartIcon={<ShareIcon />}
          />
          <Button
            variant='secondary'
            text='Add Content'
            onClick={() => {
              setModalOpen(true);
            }}
            StartIcon={<PlusIcon />}
          />
        </div>
        <div className='flex gap-4'>
          <Card
            title='Youtube video'
            link='https://www.youtube.com/watch?v=SweexyXMYYc'
            type='youtube'
          />
          <Card
            title='Tweet'
            link='https://x.com/arpit_bhayani/status/1893870952003629488'
            type='twitter'
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
