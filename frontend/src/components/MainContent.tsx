import PlusIcon from '../icons/PlusIcon';
import ShareIcon from '../icons/ShareIcon';
import Button from './Button';
import Card from './Card';

const MainContent = () => {
  return (
    <div className='h-screen w-full bg-amber-100 p-4'>
      <div className=' mt-25 mb-10 w-full'>
        <div>left link</div>
        <div className='flex items-center justify-end gap-4'>
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
  );
};

export default MainContent;
