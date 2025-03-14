import { useRef, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import Button from './Button';
import Input from './Input';
import axios from 'axios';
import { BACKEND_URL } from '../config';

enum ContentType {
  Youtube = 'youtube',
  Twitter = 'twitter',
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState('youtube');

  async function addContent() {
    const link = linkRef.current?.value;
    const title = titleRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        title,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
  }

  return (
    <div>
      {open && (
        <div>
          <div className='w-screen h-screen bg-slate-300 fixed top-0 left-0 opacity-65 flex justify-center'></div>
          <div className='w-screen h-screen bg-slate-300 fixed top-0 left-0 flex justify-center'>
            <div className='flex flex-col justify-center'>
              <span className='bg-white opacity-100 p-4 rounded'>
                <div className='flex justify-end'>
                  <div onClick={onClose} className='cursor-pointer'>
                    <CloseIcon />
                  </div>
                </div>
                <div className='flex justify-center'>
                  <Input placeholder={'Title'} />
                  <Input placeholder={'Link'} />
                </div>
                <div>
                  <h1>Type</h1>
                  <div className='flex justify-center gap-1 items-center pb-2'>
                    <Button
                      text='Youtube'
                      variant={
                        type === ContentType.Youtube ? 'primary' : 'secondary'
                      }
                      onClick={() => {
                        setType('youtube');
                      }}
                    />
                    <Button
                      text='Twitter'
                      variant={
                        type === ContentType.Twitter ? 'primary' : 'secondary'
                      }
                      onClick={() => {
                        setType('twitter');
                      }}
                    />
                  </div>
                </div>
                <div className='flex justify-center'>
                  <Button
                    onClick={addContent}
                    variant='primary'
                    text='Submit'
                  ></Button>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
