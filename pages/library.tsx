import type { NextPage } from 'next';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import MovieCard from '../components/MovieCard';
import { HiCollection, HiViewGrid, HiViewList, HiHeart, HiPlay } from 'react-icons/hi';
import { RiMovieLine, RiTvLine } from 'react-icons/ri';
import useFavourites from '../hooks/useFavourites';
import Image from 'next/image';

interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string[];
  duration: string;
  category: string;
  isTrending: boolean;
}

const Library: NextPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Only use favourites
  const { data: favourites = [] } = useFavourites();

  const tabs = [
    { 
      id: 'all', 
      label: 'My Library', 
      icon: HiCollection, 
      count: favourites.length,
      description: 'All your favourite content'
    },
    { 
      id: 'movies', 
      label: 'Movies', 
      icon: RiMovieLine, 
      count: favourites.filter(item => item.category === 'movies').length,
      description: 'Your favourite movies'
    },
    { 
      id: 'series', 
      label: 'TV Series', 
      icon: RiTvLine, 
      count: favourites.filter(item => item.category === 'tv-series').length,
      description: 'Your favourite TV shows'
    },
  ];

  const getFilteredContent = (): Movie[] => {
    switch (activeTab) {
      case 'movies':
        return favourites.filter(item => item.category === 'movies');
      case 'series':
        return favourites.filter(item => item.category === 'tv-series');
      default:
        return favourites;
    }
  };

  const getContentByCategory = (content: Movie[]) => {
    const categories = {
      movies: content.filter(item => item.category === 'movies'),
      series: content.filter(item => item.category === 'tv-series'),
      documentaries: content.filter(item => item.category === 'documentaries'),
      anime: content.filter(item => item.category === 'anime'),
      kids: content.filter(item => item.category === 'kids-family'),
      originals: content.filter(item => item.category === 'funstar-originals'),
    };
    return categories;
  };

  const currentContent = getFilteredContent();
  const contentByCategory = getContentByCategory(favourites);
  const currentTab = tabs.find(tab => tab.id === activeTab);

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
            className="flex flex-col gap-6 sm:gap-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  My Library
                </h1>
                <p className="text-slate-400 text-sm sm:text-base">
                  Your favourite movies and shows
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
            </div>

            {/* Library Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <HiHeart className="text-red-400 text-xl" />
                  <span className="text-slate-400 text-sm">Total</span>
                </div>
                <div className="text-2xl font-bold text-white">{favourites.length}</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <RiMovieLine className="text-blue-400 text-xl" />
                  <span className="text-slate-400 text-sm">Movies</span>
                </div>
                <div className="text-2xl font-bold text-white">{contentByCategory.movies.length}</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <RiTvLine className="text-green-400 text-xl" />
                  <span className="text-slate-400 text-sm">TV Series</span>
                </div>
                <div className="text-2xl font-bold text-white">{contentByCategory.series.length}</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <HiCollection className="text-purple-400 text-xl" />
                  <span className="text-slate-400 text-sm">Documentaries</span>
                </div>
                <div className="text-2xl font-bold text-white">{contentByCategory.documentaries.length}</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <HiCollection className="text-yellow-400 text-xl" />
                  <span className="text-slate-400 text-sm">Anime</span>
                </div>
                <div className="text-2xl font-bold text-white">{contentByCategory.anime.length}</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <HiCollection className="text-orange-400 text-xl" />
                  <span className="text-slate-400 text-sm">Originals</span>
                </div>
                <div className="text-2xl font-bold text-white">{contentByCategory.originals.length}</div>
              </div>
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
              className={`flex items-center gap-3 px-4 sm:px-6 py-4 rounded-xl transition-all duration-300 whitespace-nowrap border min-w-fit ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/50 border-slate-700/50 hover:border-slate-600/50'
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="text-lg flex-shrink-0" />
              <div className="text-left">
                <div className="font-medium">{tab.label}</div>
                <div className={`text-xs ${activeTab === tab.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {tab.count} items
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Current tab info */}
      {currentTab && (
        <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-2"
          >
            <currentTab.icon className="text-indigo-400 text-2xl" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">{currentTab.label}</h2>
          </motion.div>
          <p className="text-slate-400 text-sm sm:text-base">{currentTab.description}</p>
        </div>
      )}

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
            {currentContent.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6'
                  : 'space-y-4'
              }>
                {currentContent.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${activeTab}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    {viewMode === 'grid' ? (
                      <MovieCard data={item} />
                    ) : (
                      <motion.div 
                        className="flex gap-4 p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl hover:bg-slate-700/50 transition-all duration-300 border border-slate-700/30 hover:border-slate-600/50 group cursor-pointer"
                        whileHover={{ y: -2 }}
                        onClick={() => window.location.href = `/watch/${item.id}`}
                      >
                        <div className="w-28 h-20 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0 relative">
                          <Image 
                            src={item.thumbnailUrl} 
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm sm:text-base truncate mb-1 group-hover:text-indigo-300 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-slate-400 text-xs sm:text-sm mb-2 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="bg-slate-700/50 px-2 py-1 rounded">
                              {Array.isArray(item.genre) ? item.genre.join(', ') : item.genre}
                            </span>
                            <span>{item.duration}</span>
                            <span className="capitalize">{item.category.replace('-', ' ')}</span>
                          </div>
                        </div>
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <HiPlay className="text-white text-xl" />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiHeart className="text-slate-400 text-3xl" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">
                  No favourites yet
                </h3>
                <p className="text-slate-400 mb-6 max-w-md mx-auto">
                  Start building your library by liking movies and shows you enjoy.
                </p>
                <motion.button
                  onClick={() => window.location.href = '/browse'}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Content
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Library;