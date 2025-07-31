import type { NextPage } from 'next';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import MovieCard from '../components/MovieCard';
import { HiCollection, HiClock, HiDownload, HiViewGrid, HiViewList } from 'react-icons/hi';
import { RiMovieLine, RiTvLine } from 'react-icons/ri';
import useMovieList from '../hooks/useMovieList';
import useFavourites from '../hooks/useFavourites';

const Library: NextPage = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const tabs = [
    { id: 'all', label: 'All', icon: HiCollection, count: movies.length + favourites.length },
    { id: 'movies', label: 'Movies', icon: RiMovieLine, count: movies.length },
    { id: 'series', label: 'TV Series', icon: RiTvLine, count: favourites.length },
    { id: 'downloads', label: 'Downloads', icon: HiDownload, count: 5 },
    { id: 'recently', label: 'Recently Watched', icon: HiClock, count: 12 },
  ];

  const getFilteredContent = () => {
    switch (activeTab) {
      case 'movies':
        return movies;
      case 'series':
        return favourites;
      case 'downloads':
        return movies.slice(0, 5);
      case 'recently':
        return [...movies, ...favourites].slice(0, 12);
      default:
        return [...movies, ...favourites];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <BottomNavigation />

      {/* Header */}
      <div className="pt-20 sm:pt-24 lg:pt-28 pb-8">
        <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                My Library
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                Your personal collection on Funstar
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiViewGrid className="text-lg" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiViewList className="text-lg" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 sm:px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap border ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/50 border-slate-700/50 hover:border-slate-600/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="text-lg" />
              <span className="font-medium">{tab.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-slate-600/50'
              }`}>
                {tab.count}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 pb-24 sm:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {getFilteredContent().length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6'
                  : 'space-y-4'
              }>
                {getFilteredContent().map((item, index) => (
                  <motion.div
                    key={`${item.id}-${activeTab}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {viewMode === 'grid' ? (
                      <MovieCard data={item} />
                    ) : (
                      <div className="flex gap-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/50 transition-colors">
                        <div className="w-24 h-16 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.thumbnailUrl} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium text-sm sm:text-base truncate">
                            {item.title}
                          </h3>
                          <p className="text-slate-400 text-xs sm:text-sm mt-1">
                            {item.genre} • {item.duration}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiCollection className="text-slate-400 text-2xl" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">No content found</h3>
                <p className="text-slate-400">Start building your library by adding content to your watchlist</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Library;