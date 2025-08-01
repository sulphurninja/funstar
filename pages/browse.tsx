import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import Billboard from '../components/Billboard';
import MovieList from '../components/MovieList';
import useMovieList from '../hooks/useMovieList';
import useFavourites from '../hooks/useFavourites';
import InfoModal from '../components/InfoModal';
import useInfoModal from '../hooks/useInfoModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiTrendingUp, HiStar, HiClock, HiUsers, HiCollection, HiChevronDown } from 'react-icons/hi';
import { RiVipCrownLine, RiLiveLine } from 'react-icons/ri';
import { MdMovieCreation, MdRecommend } from 'react-icons/md';
import { BiCameraMovie } from 'react-icons/bi';
import { FaChild } from 'react-icons/fa';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const Browse: NextPage = () => {
  const { data: allMovies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();
  const { isOpen, closeModal } = useInfoModal();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch movies by category
  const { data: categoryMovies = [] } = useSWR(
    activeCategory !== 'all' ? `/api/movies?category=${activeCategory}` : null,
    fetcher
  );

  // Get trending movies
  const { data: trendingMovies = [] } = useSWR('/api/movies?trending=true', fetcher);

  // Enhanced responsive hook with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Content', icon: HiCollection },
    { id: 'trending', label: 'Trending', icon: HiTrendingUp },
    { id: 'movies', label: 'Movies', icon: MdMovieCreation },
    { id: 'series', label: 'TV Series', icon: BiCameraMovie },
    { id: 'documentaries', label: 'Documentaries', icon: MdRecommend },
    { id: 'anime', label: 'Anime', icon: HiStar },
    { id: 'kids', label: 'Kids & Family', icon: FaChild },
    { id: 'originals', label: 'Funstar Originals', icon: RiVipCrownLine },
  ];

  const platformStats = [
    { label: 'Active Viewers', value: '2.4M', icon: HiUsers },
    { label: 'New This Week', value: '24', icon: HiClock },
    { label: 'Platform Rating', value: '9.2', icon: HiStar },
  ];

  const visibleCategories = isMobile && !showAllCategories 
    ? categories.slice(0, 3) 
    : categories;

  // Get movies to display based on active category
  const getMoviesToDisplay = () => {
    switch (activeCategory) {
      case 'all':
        return allMovies;
      case 'trending':
        return trendingMovies;
      default:
        return categoryMovies;
    }
  };

  const moviesToDisplay = getMoviesToDisplay();

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-x-hidden">
      {/* Mobile-optimized background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-indigo-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <InfoModal visible={isOpen} onClose={closeModal} />
      
      {/* Top Navigation */}
      <Navbar />
      
      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation />
      
      <Billboard />

      {/* Mobile-first stats section */}
      <motion.section 
        className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 mb-4 sm:mb-6 md:mb-8 lg:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl md:rounded-2xl border border-slate-700/30 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              {/* Live indicator */}
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white font-medium text-sm sm:text-base">Platform Statistics</span>
              </div>
              
              {/* Mobile-optimized stats grid */}
              <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-6 lg:gap-8 w-full sm:w-auto">
                {platformStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center sm:text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 mb-1">
                      <stat.icon className="text-slate-400 text-sm sm:text-base" />
                      <span className="text-white font-bold text-sm sm:text-lg">{stat.value}</span>
                    </div>
                    <span className="text-slate-400 text-xs sm:text-sm block">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Mobile-first category navigation */}
      <motion.nav
        className="relative z-10 mb-4 sm:mb-6 md:mb-8 lg:mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          {/* Mobile optimized categories */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {visibleCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-300 border text-sm ${
                    activeCategory === category.id
                      ? 'bg-slate-700 text-white border-slate-600 shadow-lg'
                      : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/50 border-slate-700/50 active:bg-slate-700/70'
                  }`}
                  whileHover={{ scale: isMobile ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <category.icon className="text-sm sm:text-base flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">{category.label}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Show more button for mobile */}
            {isMobile && categories.length > 3 && (
              <motion.button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="flex items-center gap-2 text-slate-400 hover:text-white active:text-slate-200 text-sm font-medium transition-colors py-1"
                whileTap={{ scale: 0.98 }}
              >
                <span>{showAllCategories ? 'Show Less' : 'Show More'}</span>
                <motion.div
                  animate={{ rotate: showAllCategories ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiChevronDown className="text-sm" />
                </motion.div>
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile-optimized content sections */}
      <motion.main 
        className="relative z-10 pb-20 sm:pb-24 lg:pb-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16">
          
          {/* Selected Category Content */}
          <section>
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg border border-indigo-500/30">
                  {(() => {
                    const category = categories.find(c => c.id === activeCategory);
                    const IconComponent = category?.icon || HiCollection;
                    return <IconComponent className="text-indigo-400 text-base sm:text-lg lg:text-xl" />;
                  })()}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                    {categories.find(c => c.id === activeCategory)?.label}
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base mt-1">
                    {moviesToDisplay.length} {moviesToDisplay.length === 1 ? 'movie' : 'movies'} available
                  </p>
                </div>
              </div>
              <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-gradient-to-r from-indigo-500/60 to-transparent rounded-full"></div>
            </div>
            {moviesToDisplay.length > 0 ? (
              <MovieList title="" data={moviesToDisplay} />
            ) : (
              <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                <div className="text-center py-12">
                  <div className="text-slate-400 text-lg mb-2">No movies found</div>
                  <div className="text-slate-500 text-sm">Try selecting a different category</div>
                </div>
              </div>
            )}
          </section>

          {/* Continue Watching */}
          <AnimatePresence>
            {favourites.length > 0 && (
              <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
              >
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-lg border border-emerald-500/30">
                      <HiClock className="text-emerald-400 text-base sm:text-lg lg:text-xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                        Continue Watching
                      </h2>
                      <p className="text-slate-400 text-sm sm:text-base mt-1">Resume where you left off</p>
                    </div>
                  </div>
                  <div className="w-12 sm:w-16 md:w-20 h-0.5 bg-gradient-to-r from-emerald-500/60 to-transparent rounded-full"></div>
                </div>
                <MovieList title="" data={favourites} />
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
};

export default Browse;