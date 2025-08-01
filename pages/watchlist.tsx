import type { NextPage } from 'next';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import MovieCard from '../components/MovieCard';
import { HiHeart, HiPlus, HiTrash, HiShare, HiViewGrid, HiViewList, HiPlay } from 'react-icons/hi';
import { RiPlayListLine, RiMovieLine, RiTvLine } from 'react-icons/ri';
import useFavourites from '../hooks/useFavourites';
import { toast } from 'react-hot-toast';
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

const Watchlist: NextPage = () => {
  const { data: favourites = [], mutate } = useFavourites();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', count: favourites.length },
    { id: 'movies', label: 'Movies', count: favourites.filter(item => item.category === 'movies').length },
    { id: 'tv-series', label: 'TV Series', count: favourites.filter(item => item.category === 'tv-series').length },
    { id: 'documentaries', label: 'Documentaries', count: favourites.filter(item => item.category === 'documentaries').length },
    { id: 'anime', label: 'Anime', count: favourites.filter(item => item.category === 'anime').length },
  ];

  const getFilteredFavourites = (): Movie[] => {
    if (filterCategory === 'all') return favourites;
    return favourites.filter(item => item.category === filterCategory);
  };

  const filteredFavourites = getFilteredFavourites();

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(filteredFavourites.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
    setIsSelectionMode(false);
  };

  const removeSelectedFromFavourites = async () => {
    try {
      // Remove each selected item from favourites
      for (const movieId of selectedItems) {
        await fetch(`/api/favourite?movieId=${movieId}`, {
          method: 'DELETE'
        });
      }
      
      // Refresh the favourites list
      mutate();
      clearSelection();
      toast.success(`Removed ${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} from watchlist`);
    } catch (error) {
      toast.error('Failed to remove items from watchlist');
    }
  };

  const shareWatchlist = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Funstar Watchlist',
          text: `Check out my watchlist with ${favourites.length} amazing movies and shows!`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success('Watchlist link copied to clipboard!');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Watchlist link copied to clipboard!');
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
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <HiHeart className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">
                    My Watchlist
                  </h1>
                  <p className="text-slate-400 text-sm sm:text-base">
                    {favourites.length} item{favourites.length !== 1 ? 's' : ''} saved to watch later
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {!isSelectionMode ? (
                  <>
                    {/* View Toggle */}
                    <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
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
                      onClick={shareWatchlist}
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
            </div>

            {/* Category Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
                <div className="text-2xl font-bold text-white">
                  {favourites.filter(item => item.category === 'movies').length}
                </div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <RiTvLine className="text-green-400 text-xl" />
                  <span className="text-slate-400 text-sm">TV Series</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {favourites.filter(item => item.category === 'tv-series').length}
                </div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <HiPlay className="text-purple-400 text-xl" />
                  <span className="text-slate-400 text-sm">Documentaries</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {favourites.filter(item => item.category === 'documentaries').length}
                </div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <HiPlay className="text-yellow-400 text-xl" />
                  <span className="text-slate-400 text-sm">Anime</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {favourites.filter(item => item.category === 'anime').length}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilterCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap text-sm ${
                filterCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{category.label}</span>
              {category.count > 0 && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  filterCategory === category.id ? 'bg-white/20' : 'bg-slate-600/50'
                }`}>
                  {category.count}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
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
                    onClick={removeSelectedFromFavourites}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg transition-colors flex items-center gap-2 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HiTrash className="text-lg" />
                    <span>Remove</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 pb-24 sm:pb-16">
        {filteredFavourites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6'
                : 'space-y-4'
            }>
              {filteredFavourites.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
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
                  
                  {viewMode === 'grid' ? (
                    <MovieCard data={item} />
                  ) : (
                    <motion.div 
                      className="flex gap-4 p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl hover:bg-slate-700/50 transition-all duration-300 border border-slate-700/30 hover:border-slate-600/50 group cursor-pointer"
                      whileHover={{ y: -2 }}
                      onClick={() => !isSelectionMode && (window.location.href = `/watch/${item.id}`)}
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
                      {!isSelectionMode && (
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <HiPlay className="text-white text-xl" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
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
            <h3 className="text-white text-2xl font-bold mb-4">
              {filterCategory === 'all' ? 'Your watchlist is empty' : `No ${categories.find(c => c.id === filterCategory)?.label.toLowerCase()} in your watchlist`}
            </h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              {filterCategory === 'all' 
                ? 'Browse Funstar content and add movies and shows you want to watch later'
                : `Add some ${categories.find(c => c.id === filterCategory)?.label.toLowerCase()} to your watchlist to see them here`
              }
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