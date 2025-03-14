import { useState } from 'react';
import '../App.css';
import Button from '../components/Button';
import Card from '../components/Card';
import CreateContentModal from '../components/CreateContentModal';
import SideBar from '../components/SideBar';
import PlusIcon from '../icons/PlusIcon';
import ShareIcon from '../icons/ShareIcon';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';

function Dashboard() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
  const contents = useContent;

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
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem('token'),
                  },
                }
              );

              const shareURL = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareURL);
            }}
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
          {contents.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} />
          ))}
          {/* <Card
            title='Tweet'
            link='https://x.com/arpit_bhayani/status/1893870952003629488'
            type='twitter'
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
