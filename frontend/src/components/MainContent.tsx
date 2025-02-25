import PlusIcon from '../icons/PlusIcon';
import ShareIcon from '../icons/ShareIcon';
import Button from './Button';

const MainContent = () => {
  return (
    <div className='h-screen w-full bg-amber-100'>
      <div className='flex items-center mt-25 mb-10 w-full'>
        <div>left link</div>
        <div className='flex items-center justify-around'>
          <Button
            variant='primary'
            text='Share Brain'
            StartIcon={<ShareIcon />}
          />
          <Button
            variant='secondary'
            text='Add Content'
            StartIcon={<PlusIcon />}
          />
        </div>
      </div>
      <div className='flex justify-around'>
        <div className='bg-green-200 w-64 h-80 rounded-3xl'>card1</div>
        <div className='bg-green-200 w-64 h-80 rounded-3xl'>card2</div>
        <div className='bg-green-200 w-64 h-80 rounded-3xl'>card3</div>
      </div>
    </div>
  );
};

export default MainContent;
