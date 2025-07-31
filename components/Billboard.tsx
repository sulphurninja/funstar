import React, { useEffect, useRef, useState } from 'react';
import useBillboard from '../hooks/useBillboard';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiInformationCircle, HiPlus, HiStar, HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Billboard = () => {
  const { data } = useBillboard();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMute, setIsMute] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
      setShowContent(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* Responsive video background */}
      <video
        ref={videoRef}
        loop
        muted={isMute}
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
        className='absolute inset-0 w-full h-full object-cover'
      />
      
      {/* Professional gradient overlays */}
      <div className='absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-slate-950/20' />
      <div className='absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30' />

      {/* Responsive content container */}
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20'>
          <div className='max-w-none lg:max-w-4xl xl:max-w-5xl'>
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Premium content metadata */}
                  <motion.div
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4 sm:mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-gradient-to-r from-slate-700 to-slate-600 text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-md backdrop-blur-sm border border-slate-600/50">
                        EXCLUSIVE PREMIERE
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <HiStar className="text-amber-400 text-sm" />
                        <span className="text-sm font-medium">8.9</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-slate-400 text-sm">
                      <span>2024</span>
                      <span>•</span>
                      <span>4K Ultra HD</span>
                      <span>•</span>
                      <span>Dolby Atmos</span>
                    </div>
                  </motion.div>
                  
                  {/* Responsive title */}
                  <motion.h1 
                    className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-none'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {data?.title}
                  </motion.h1>
                  
                  {/* Responsive description */}
                  <motion.p 
                    className='text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 lg:mb-10 max-w-none sm:max-w-xl lg:max-w-2xl leading-relaxed font-light line-clamp-3 sm:line-clamp-none'
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {data?.description}
                  </motion.p>

                  {/* Responsive action buttons */}
                  <motion.div 
                    className='flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6'
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <motion.button
                      className='bg-white hover:bg-slate-100 text-slate-900 font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg text-sm sm:text-base lg:text-lg order-1'
                      onClick={() => window.location.href = `/watch/${data?.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BsFillPlayFill className='text-lg sm:text-xl lg:text-2xl' />
                      <span>Watch Now</span>
                    </motion.button>
                    
                    <motion.button 
                      className='bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50 text-sm sm:text-base lg:text-lg order-2'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HiPlus className='text-base sm:text-lg lg:text-xl' />
                      <span className="hidden sm:inline">Add to</span>
                      <span>Watchlist</span>
                    </motion.button>
                    
                    <motion.button 
                      className='bg-transparent hover:bg-white/10 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50 backdrop-blur-sm text-sm sm:text-base lg:text-lg order-3'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HiInformationCircle className='text-base sm:text-lg lg:text-xl' />
                      <span>More Info</span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Professional volume control */}
      <motion.button
        className="absolute bottom-6 sm:bottom-8 right-4 sm:right-6 lg:right-8 bg-slate-900/80 backdrop-blur-sm hover:bg-slate-800/80 text-white p-2.5 sm:p-3 rounded-full transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50"
        onClick={() => setIsMute(!isMute)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {isMute ? 
          <HiVolumeOff className="text-base sm:text-lg" /> : 
          <HiVolumeUp className="text-base sm:text-lg" />
        }
      </motion.button>

      {/* Professional scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll to explore</span>
          <div className="w-0.5 h-6 bg-gradient-to-b from-white/60 to-transparent rounded-full"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Billboard;