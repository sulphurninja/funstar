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

const Browse: NextPage = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();
  const { isOpen, closeModal } = useInfoModal();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive hook
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
    { id: 'all', label: 'All Content', icon: HiCollection },
    { id: 'trending', label: 'Trending', icon: HiTrendingUp },
    { id: 'premium', label: 'Premium', icon: RiVipCrownLine },
    { id: 'live', label: 'Live', icon: RiLiveLine },
    { id: 'movies', label: 'Movies', icon: MdMovieCreation },
  ];

  const platformStats = [
    { label: 'Active Viewers', value: '2.4M', icon: HiUsers },
    { label: 'New This Week', value: '24', icon: HiClock },
    { label: 'Platform Rating', value: '9.2', icon: HiStar },
  ];

  const visibleCategories = isMobile && !showAllCategories 
    ? categories.slice(0, 3) 
    : categories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      {/* Responsive background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-indigo-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-500/5 rounded-full blur-3xl"
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

      {/* Fully responsive stats section with bottom nav padding */}
      <motion.section 
        className="relative z-10 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 mb-6 sm:mb-8 lg:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="px-3 xs:px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-lg sm:rounded-xl lg:rounded-2xl border border-slate-700/30 p-3 xs:p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              {/* Live indicator - responsive */}
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white font-medium text-xs xs:text-sm sm:text-base">Platform Statistics</span>
              </div>
              
              {/* Stats - responsive grid */}
              <div className="grid grid-cols-3 gap-3 xs:gap-4 sm:flex sm:items-center sm:gap-6 lg:gap-8">
                {platformStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex flex-col xs:flex-row items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 mb-1">
                      <stat.icon className="text-slate-400 text-xs xs:text-sm sm:text-base" />
                      <span className="text-white font-bold text-xs xs:text-sm sm:text-lg">{stat.value}</span>
                    </div>
                    <span className="text-slate-400 text-xs sm:text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Responsive category navigation */}
      <motion.nav
        className="relative z-10 mb-6 sm:mb-8 lg:mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="px-3 xs:px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
          {/* Mobile collapsible categories */}
          {isMobile ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {visibleCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-3 xs:px-4 py-2 rounded-lg transition-all duration-300 border text-xs xs:text-sm ${
                      activeCategory === category.id
                        ? 'bg-slate-700 text-white border-slate-600 shadow-lg'
                        : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/50 border-slate-700/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <category.icon className="text-sm" />
                    <span className="font-medium">{category.label}</span>
                  </motion.button>
                ))}
              </div>
              
              {/* Show more button for mobile */}
              {categories.length > 3 && (
                <motion.button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
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
          ) : (
            /* Desktop horizontal scroll */
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 whitespace-nowrap border text-sm sm:text-base ${
                    activeCategory === category.id
                      ? 'bg-slate-700 text-white border-slate-600 shadow-lg'
                      : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/50 border-slate-700/50 hover:border-slate-600/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <category.icon className="text-base sm:text-lg" />
                  <span className="font-medium">{category.label}</span>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.nav>

      {/* Responsive content sections with bottom nav padding */}
      <motion.main 
        className="relative z-10 pb-24 sm:pb-16 lg:pb-20 xl:pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="space-y-8 sm:space-y-12 lg:space-y-16 xl:space-y-20">
          
          {/* Trending Section */}
          <section>
            <div className="px-3 xs:px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col xs:flex-row xs:items-start gap-3 xs:gap-4 mb-3 sm:mb-4">
                <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg w-fit border border-orange-500/30">
                  <HiTrendingUp className="text-orange-400 text-base sm:text-lg lg:text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight leading-tight">
                    Trending This Week
                  </h2>
                  <p className="text-slate-400 text-xs xs:text-sm sm:text-base mt-1">Most watched content right now</p>
                </div>
              </div>
              <div className="w-8 xs:w-10 sm:w-12 lg:w-16 xl:w-20 h-0.5 bg-gradient-to-r from-orange-500/60 to-transparent rounded-full"></div>
            </div>
            <MovieList title="" data={movies} />
          </section>

          {/* AI Recommendations */}
          <section>
            <div className="px-3 xs:px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col xs:flex-row xs:items-start gap-3 xs:gap-4 mb-3 sm:mb-4">
                <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-r w-fit from-indigo-600/20 to-purple-600/20 rounded-lg border border-indigo-500/30">
                  <MdRecommend className="text-indigo-400 text-base sm:text-lg lg:text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight leading-tight">
                    Recommended for You
                  </h2>
                  <p className="text-slate-400 text-xs xs:text-sm sm:text-base mt-1">Curated based on your preferences</p>
                </div>
              </div>
              <div className="w-8 xs:w-10 sm:w-12 lg:w-16 xl:w-20 h-0.5 bg-gradient-to-r from-indigo-500/60 to-transparent rounded-full"></div>
            </div>
            <MovieList title="" data={movies} />
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
                <div className="px-3 xs:px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex flex-col xs:flex-row xs:items-start gap-3 xs:gap-4 mb-3 sm:mb-4">
                    <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-r w-fit from-emerald-600/20 to-teal-600/20 rounded-lg border border-emerald-500/30">
                      <HiClock className="text-emerald-400 text-base sm:text-lg lg:text-xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight leading-tight">
                        Continue Watching
                      </h2>
                      <p className="text-slate-400 text-xs xs:text-sm sm:text-base mt-1">Resume where you left off</p>
                    </div>
                  </div>
                  <div className="w-8 xs:w-10 sm:w-12 lg:w-16 xl:w-20 h-0.5 bg-gradient-to-r from-emerald-500/60 to-transparent rounded-full"></div>
                </div>
                <MovieList title="" data={favourites} />
              </motion.section>
            )}
          </AnimatePresence>

          {/* Funstar Originals */}
          <section>
            <div className="px-3 xs:px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col xs:flex-row xs:items-start gap-3 xs:gap-4 mb-3 sm:mb-4">
                <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-r w-fit from-amber-600/20 to-yellow-600/20 rounded-lg border border-amber-500/30">
                  <RiVipCrownLine className="text-amber-400 text-base sm:text-lg lg:text-xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight leading-tight">
                    Funstar Originals
                  </h2>
                  <p className="text-slate-400 text-xs xs:text-sm sm:text-base mt-1">Exclusive premium content</p>
                </div>
              </div>
              <div className="w-8 xs:w-10 sm:w-12 lg:w-16 xl:w-20 h-0.5 bg-gradient-to-r from-amber-500/60 to-transparent rounded-full"></div>
            </div>
            <MovieList title="" data={movies} />
          </section>

          {/* Additional Categories - Clean without special styling */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            <MovieList title="New Releases" data={movies} />
            <MovieList title="Award Winners" data={movies} />
            <MovieList title="Action & Adventure" data={movies} />
            <MovieList title="Critically Acclaimed" data={movies} />
            <MovieList title="International Cinema" data={movies} />
            <MovieList title="Documentaries" data={movies} />
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default Browse;