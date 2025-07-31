import React from 'react';
import { isEmpty } from 'lodash';
import MovieCard from './MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import 'swiper/css';
import 'swiper/css/free-mode';

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  // Move hooks to the top, before any conditional logic
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  if (isEmpty(data)) return null;

  return (
    <motion.section
      className="w-full mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Premium section header */}
      <div className="px-6 lg:px-12 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{title}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-full"></div>
        </motion.div>
      </div>

      {/* Premium carousel */}
      <div className="relative group">
        {/* Elegant navigation */}
        <motion.button
          ref={navigationPrevRef}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 backdrop-blur-sm hover:bg-slate-800/90 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl border border-slate-700/50 hover:border-slate-600"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          <HiChevronLeft className="text-xl" />
        </motion.button>

        <motion.button
          ref={navigationNextRef}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 backdrop-blur-sm hover:bg-slate-800/90 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl border border-slate-700/50 hover:border-slate-600"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ x: 20 }}
          animate={{ x: 0 }}
        >
          <HiChevronRight className="text-xl" />
        </motion.button>

        {/* Premium swiper */}
        <div className="px-6 lg:px-12">
          <Swiper
            modules={[Navigation, FreeMode]}
            spaceBetween={24}
            slidesPerView={1.2}
            freeMode={true}
            breakpoints={{
              640: { slidesPerView: 1.8, spaceBetween: 28 },
              768: { slidesPerView: 2.4, spaceBetween: 32 },
              1024: { slidesPerView: 3.2, spaceBetween: 36 },
              1280: { slidesPerView: 3.8, spaceBetween: 40 },
              1536: { slidesPerView: 4.4, spaceBetween: 44 },
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            className="!overflow-visible !pb-8"
          >
            {data.map((movie, index) => (
              <SwiperSlide key={movie.id} className="!h-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                >
                  <MovieCard data={movie} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
};

export default MovieList;