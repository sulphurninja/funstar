import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useMovie from '../../hooks/useMovie';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  useEffect(() => {
    // Redirect to video URL when data is loaded
    if (data?.videoUrl) {
      window.location.href = data.videoUrl;
    }
  }, [data?.videoUrl]);

  return (
    <div className='h-screen w-screen bg-black flex flex-col items-center justify-center'>
      <nav className='fixed top-0 w-full p-4 z-10 flex flex-row items-center gap-4 md:gap-8 bg-black bg-opacity-70'>
        <HiOutlineArrowLeft
          onClick={() => router.push('/browse')}
          className='w-4 md:w-10 font-extrabold text-5xl text-white cursor-pointer hover:opacity-80 transition'
        />
        <p className='text-white text-1xl md:text-3xl font-bold'>
          <span className='font-normal'>Watching:</span> {data?.title}
        </p>
      </nav>
      
      {data?.videoUrl ? (
        <div className='text-center'>
          <div className='loading-logo mb-4'>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="white" className='animate-spin'>
              <path d="M18 4v1h-2V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1h2v1c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V4c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4zm-4 8.5c0-.83-.67-1.5-1.5-1.5S11 11.67 11 12.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z"/>
            </svg>
          </div>
          <p className='text-white text-lg mb-4'>Redirecting to video...</p>
          <a 
            href={data.videoUrl} 
            className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'
          >
            Open Video
          </a>
        </div>
      ) : (
        <div className='text-center'>
          <div className='loading-logo mb-4'>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="white" className='animate-pulse'>
              <path d="M18 4v1h-2V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1h2v1c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V4c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4zm-4 8.5c0-.83-.67-1.5-1.5-1.5S11 11.67 11 12.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z"/>
            </svg>
          </div>
          <p className='text-white text-lg'>Loading video...</p>
        </div>
      )}
    </div>
  );
};

export default Watch;