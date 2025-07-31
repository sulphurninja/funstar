import Image from 'next/image';
import React, { useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiOutlineInformationCircle, HiOutlinePlus, HiOutlineHeart } from 'react-icons/hi2';
import { HiStar } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className='group cursor-pointer w-full'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -12 }}
      viewport={{ once: true }}
    >
      <div className='relative bg-gradient-to-br from-slate-900/40 to-slate-950/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-slate-800/30 hover:border-slate-700/50 transition-all duration-700 w-full group-hover:shadow-indigo-500/10'>
        
        {/* Premium image container */}
        <div className='relative aspect-[16/10] overflow-hidden'>
          <Image
            src={data?.thumbnailUrl}
            alt={data?.title || 'Movie'}
            fill
            sizes='(max-width: 768px) 55vw, (max-width: 1024px) 35vw, 28vw'
            className='object-cover transition-all duration-1000 group-hover:scale-105'
          />
          
          {/* Sophisticated gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700' />
          
          {/* Floating action buttons */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className='absolute inset-0 flex items-center justify-center gap-4'
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.button
                  onClick={() => router.push(`/watch/${data?.id}`)}
                  className='bg-white text-slate-900 rounded-full p-4 hover:bg-slate-100 transition-all duration-300 shadow-2xl backdrop-blur-sm'
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <BsFillPlayFill className='text-xl ml-0.5' />
                </motion.button>
                
                <motion.button 
                  className='bg-slate-800/80 backdrop-blur-sm text-white rounded-full p-3 hover:bg-slate-700/80 transition-all duration-300 shadow-xl border border-slate-600/50'
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HiOutlinePlus className='text-lg' />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Premium quality badge */}
          <motion.div 
            className='absolute top-4 left-4'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className='bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm'>
              4K HDR
            </span>
          </motion.div>

          {/* Rating */}
          <motion.div 
            className='absolute top-4 right-4'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className='flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-slate-700/50'>
              <HiStar className='text-yellow-400 text-sm' />
              <span>8.4</span>
            </div>
          </motion.div>
        </div>

        {/* Clean info section */}
        <motion.div 
          className='p-6'
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className='text-white font-semibold text-lg mb-4 leading-tight line-clamp-1 tracking-tight'>
            {data?.title}
          </h3>
          
          <div className='flex items-center gap-4 text-sm text-slate-400 mb-6'>
            <span className='bg-slate-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700/30'>
              {data?.duration}
            </span>
            <span className='bg-slate-800/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700/30'>
              {data?.genre}
            </span>
          </div>

          {/* Premium CTA */}
          <motion.button
            onClick={() => router.push(`/watch/${data?.id}`)}
            className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 text-sm transition-all duration-500 shadow-lg hover:shadow-indigo-500/25 border border-indigo-500/20'
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <BsFillPlayFill className='text-base' />
            Watch Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MovieCard;