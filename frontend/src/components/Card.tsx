import ShareIcon from '../icons/ShareIcon';

interface CardProps {
  title: string;
  link: string;
  type: 'youtube' | 'twitter';
}

const Card = ({ title, link, type }: CardProps) => {
  return (
    <div>
      <div className='border border-gray-200 max-w-72 p-4 bg-white rounded-xl'>
        <div className='flex justify-between '>
          <div className='flex items-center'>
            <div className='pr-2 text-gray-500'>
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className='flex items-center'>
            <div className='pr-2 text-gray-500'>
              <a href={link} target='_blank'>
                <ShareIcon />
              </a>
            </div>
            <div className='text-gray-500'>
              <ShareIcon />
            </div>
          </div>
        </div>

        <div className='pt-4'>
          {type === 'youtube' && (
            <iframe
              className='w-full'
              src={link.replace('watch', 'embed').replace('?v=', '/')}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          )}
          {type === 'twitter' && (
            <blockquote className='twitter-tweet max-h-32'>
              <a href={link.replace('x.com', 'twitter.com')}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
