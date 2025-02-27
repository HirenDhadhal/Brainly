import CloseIcon from '../icons/CloseIcon';
import Button from './Button';
import Input from './Input';

const CreateContentModal = ({ open, onClose }) => {
  return (
    <div>
      {open && (
        <div className='w-screen h-screen bg-slate-300 fixed top-0 left-0 opacity-65 flex justify-center'>
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
              <Button variant='primary' text='Submit'></Button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
