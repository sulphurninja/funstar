import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useMovie from '../../hooks/useMovie';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [isWebView, setIsWebView] = useState(false);

  const { data } = useMovie(movieId as string);

  useEffect(() => {
    // Detect if running in webview
    const userAgent = navigator.userAgent || navigator.vendor;
    const isWebViewDetected = /wv|WebView|Android.*Version\/\d+\.\d+\s+Chrome/.test(userAgent) || 
                             window.navigator.standalone === false ||
                             /Version.*Mobile.*Safari|Android.*Version\/\d+\.\d+\s+Chrome/.test(userAgent);
    
    setIsWebView(isWebViewDetected);

    // Enable hardware acceleration and media permissions for webview
    if (isWebViewDetected && data?.videoUrl) {
      // Post message to native app to handle video playback
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'PLAY_VIDEO',
          url: data.videoUrl,
          title: data.title
        }));
      }
    }
  }, [data]);

  const handleVideoError = () => {
    // Fallback: try to open video in native player
    if (isWebView && data?.videoUrl) {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'OPEN_EXTERNAL_VIDEO',
          url: data.videoUrl,
          title: data.title
        }));
      } else {
        // Fallback: try to open in new window/tab
        window.open(data.videoUrl, '_blank');
      }
    }
  };

  const handlePlayInApp = () => {
    if (window.ReactNativeWebView && data?.videoUrl) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'PLAY_VIDEO_NATIVE',
        url: data.videoUrl,
        title: data.title
      }));
    }
  };

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

      {/* Show native play button for webview */}
      {isWebView && (
        <div className='absolute inset-0 flex items-center justify-center z-20'>
          <button
            onClick={handlePlayInApp}
            className='bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg transition-colors'
          >
            ▶ Play in App
          </button>
        </div>
      )}

      <iframe
        className='h-full w-full'
        src={data?.videoUrl}
        title={data?.title || 'Video Player'}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        frameBorder="0"
        sandbox="allow-same-origin allow-scripts allow-presentation allow-forms allow-popups allow-popups-to-escape-sandbox"
        onError={handleVideoError}
        style={{
          opacity: isWebView ? 0.3 : 1,
          pointerEvents: isWebView ? 'none' : 'auto'
        }}
      />

      {/* Fallback video element for webview */}
      {isWebView && data?.videoUrl && (
        <video
          className='h-full w-full absolute top-0 left-0'
          src={data.videoUrl}
          title={data?.title || 'Video Player'}
          controls
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          style={{ display: 'none' }}
          onError={handleVideoError}
        />
      )}
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export default Watch;