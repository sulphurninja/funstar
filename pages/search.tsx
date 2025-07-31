import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import MovieCard from '../components/MovieCard';
import { HiSearch, HiTrendingUp, HiFilter, HiX } from 'react-icons/hi';
import { RiBarcodeFill, RiVoiceprintFill } from 'react-icons/ri';
import useMovieList from '../hooks/useMovieList';

const Search: NextPage = () => {
  const { data: movies = [] } = useMovieList();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'movies', label: 'Movies' },
    { id: 'series', label: 'TV Series' },
    { id: 'documentaries', label: 'Documentaries' },
    { id: 'originals', label: 'Funstar Originals' },
  ];

  const trendingSearches = [
    'Avatar: The Way of Water',
    'Stranger Things',
    'The Batman',
    'Euphoria',
    'Top Gun: Maverick',
    'House of the Dragon',
    'Black Panther',
    'Wednesday'
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search API call
      const timer = setTimeout(() => {
        const filtered = movies.filter(movie => 
          movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, movies]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <BottomNavigation />

      {/* Header Section */}
      <div className="pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12">
        <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              Search Funstar
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Discover movies, TV shows, and exclusive content
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="mt-8 sm:mt-12 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative max-w-2xl">
              <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search for movies, shows, actors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl pl-12 pr-20 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-800/70 transition-all duration-300"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-lg transition-colors"
                >
                  <RiVoiceprintFill className="text-lg" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-colors"
                >
                  <RiBarcodeFill className="text-lg" />
                </motion.button>
              </div>
            </div>

            {/* Filter Toggle */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="mt-4 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <HiFilter className="text-lg" />
              <span className="text-sm font-medium">Filters</span>
            </motion.button>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                      <motion.button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          activeFilter === filter.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {filter.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 pb-24 sm:pb-16">
        {/* Search Results */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              {isSearching ? 'Searching...' : `Results for "${searchQuery}"`}
            </h2>
            
            {isSearching ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-slate-800/50 aspect-[3/2] rounded-xl mb-4"></div>
                    <div className="bg-slate-800/50 h-4 rounded mb-2"></div>
                    <div className="bg-slate-800/50 h-3 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                {searchResults.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <MovieCard data={movie} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No results found for "{searchQuery}"</p>
                <p className="text-slate-500 text-sm mt-2">Try adjusting your search terms</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Trending Searches */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <HiTrendingUp className="text-orange-400 text-2xl" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Trending Searches</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {trendingSearches.map((search, index) => (
                <motion.button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="p-4 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 rounded-xl text-left transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-white font-medium text-sm sm:text-base">{search}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;