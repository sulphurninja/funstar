import type { NextPage } from 'next';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import MovieCard from '../components/MovieCard';
import { HiHeart, HiPlus, HiTrash, HiShare, HiDownload } from 'react-icons/hi';
import { RiPlayListLine } from 'react-icons/ri';
import useFavourites from '../hooks/useFavourites';
import useMovieList from '../hooks/useMovieList';

const Watchlist: NextPage = () => {
  const { data: favourites = [] } = useFavourites();
  const { data: movies = [] } = useMovieList();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Combine favourites and some movies for demo
  const watchlistItems = [...favourites, ...movies.slice(0, 8)];

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(watchlistItems.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
    setIsSelectionMode(false);
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
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <HiHeart className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">
                  My Watchlist
                </h1>
                <p className="text-slate-400 text-sm sm:text-base">
                  {watchlistItems.length} items saved to watch later
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {!isSelectionMode ? (
                <>
                  <motion.button
                    onClick={() => setIsSelectionMode(true)}
                    className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-lg flex items-center gap-2 border border-slate-700/50 transition-colors text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RiPlayListLine className="text-lg" />
                    <span>Manage</span>
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-colors text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HiShare className="text-lg" />
                    <span>Share</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <span className="text-slate-400 text-sm">
                    {selectedItems.length} selected
                  </span>
                  <motion.button
                    onClick={selectAll}
                    className="px-3 py-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    Select All
                  </motion.button>
                  <motion.button
                    onClick={clearSelection}
                    className="px-3 py-2 text-slate-400 hover:text-white text-sm transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    Cancel
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Selection Actions */}
      <AnimatePresence>
        {isSelectionMode && selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 mb-6"
          >
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">
                  {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center gap-3">
                  <motion.button
                    className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HiDownload className="text-lg" />
                  </motion.button>
                  <motion.button
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HiTrash className="text-lg" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 pb-24 sm:pb-16">
        {watchlistItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6"
          >
            {watchlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Selection overlay */}
                {isSelectionMode && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-10 bg-black/50 rounded-2xl flex items-center justify-center cursor-pointer"
                    onClick={() => toggleSelection(item.id)}
                  >
                    <div className={`w-8 h-8 border-2 rounded-full flex items-center justify-center transition-all ${
                      selectedItems.includes(item.id)
                        ? 'bg-indigo-600 border-indigo-600'
                        : 'border-white/50 hover:border-white'
                    }`}>
                      {selectedItems.includes(item.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-white text-sm"
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
                
                <MovieCard data={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiHeart className="text-slate-400 text-3xl" />
            </div>
            <h3 className="text-white text-2xl font-bold mb-4">Your watchlist is empty</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Browse Funstar content and add movies and shows you want to watch later
            </p>
            <motion.button
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2 mx-auto transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/browse'}
            >
              <HiPlus className="text-lg" />
              <span>Browse Content</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;