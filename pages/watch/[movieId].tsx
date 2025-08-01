import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import useMovie from '../../hooks/useMovie';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { data } = useMovie(movieId as string);

  useEffect(() => {
    // Force iframe reload when data changes
    if (data?.videoUrl && iframeRef.current) {
      iframeRef.current.src = data.videoUrl;
    }
  }, [data?.videoUrl]);

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-4 md:gap-8 bg-black bg-opacity-70'>
        <HiOutlineArrowLeft
          onClick={() => router.push('/browse')}
          className='w-4 md:w-10 font-extrabold text-5xl text-white cursor-pointer hover:opacity-80 transition'
        />
        <p className='text-white text-1xl md:text-3xl font-bold'>
          <span className='font-normal'>Watching:</span> {data?.title}
        </p>
      </nav>
      
      {data?.videoUrl && (
        <iframe
          ref={iframeRef}
          className='h-full w-full'
          src={data.videoUrl}
          title={data?.title || 'Video Player'}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; camera; microphone; geolocation"
          referrerPolicy="no-referrer-when-downgrade"
          frameBorder="0"
          scrolling="no"
          seamless
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            height: '100%'
          }}
        />
      )}
    </div>
  );
};

export default Watch;