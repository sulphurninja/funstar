import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import MovieCard from '../components/MovieCard';
import { HiSearch, HiTrendingUp, HiFilter, HiX } from 'react-icons/hi';
import { RiBarcodeFill, RiVoiceprintFill } from 'react-icons/ri';
import useSearch from '../hooks/useSearch';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const Search: NextPage = () => {
  const { query, setQuery, category, setCategory, results, isLoading, error } = useSearch();
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Get trending movies for suggestions
  const { data: trendingMovies = [] } = useSWR('/api/movies?trending=true', fetcher);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'movies', label: 'Movies' },
    { id: 'tv-series', label: 'TV Series' },
    { id: 'documentaries', label: 'Documentaries' },
    { id: 'anime', label: 'Anime' },
    { id: 'kids-family', label: 'Kids & Family' },
    { id: 'funstar-originals', label: 'Funstar Originals' },
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

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save search to recent searches
  const saveToRecentSearches = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Handle search submission
  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    saveToRecentSearches(searchQuery);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(query);
                  }
                }}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl pl-12 pr-20 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-800/70 transition-all duration-300"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {query && (
                  <motion.button
                    onClick={() => setQuery('')}
                    className="p-2 hover:bg-slate-700/50 text-slate-400 hover:text-white rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HiX className="text-lg" />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-lg transition-colors"
                  title="Voice Search"
                >
                  <RiVoiceprintFill className="text-lg" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-colors"
                  title="Scan QR Code"
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
              {category !== 'all' && (
                <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                  {filters.find(f => f.id === category)?.label}
                </span>
              )}
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
                        onClick={() => setCategory(filter.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          category === filter.id
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
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Search Results */}
        {query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {isLoading ? 'Searching...' : `Results for "${query}"`}
                {!isLoading && results.length > 0 && (
                  <span className="text-slate-400 text-base font-normal ml-2">
                    ({results.length} {results.length === 1 ? 'result' : 'results'})
                  </span>
                )}
              </h2>
              
              {category !== 'all' && (
                <button
                  onClick={() => setCategory('all')}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Clear filter
                </button>
              )}
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-slate-800/50 aspect-[2/3] rounded-xl mb-4"></div>
                    <div className="bg-slate-800/50 h-4 rounded mb-2"></div>
                    <div className="bg-slate-800/50 h-3 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                {results.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <MovieCard data={movie} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-slate-400 text-lg mb-2">No results found for &quot;{query}&quot;</p>
                <p className="text-slate-500 text-sm">Try adjusting your search terms or filters</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Recent Searches</h2>
              <button
                onClick={clearRecentSearches}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Clear all
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <motion.button
                  key={`${search}-${index}`}
                  onClick={() => handleSearchSubmit(search)}
                  className="px-3 py-2 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 rounded-lg text-sm text-slate-300 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {search}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trending Searches */}
        {!query && (
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
                  onClick={() => handleSearchSubmit(search)}
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

        {/* Trending Movies Suggestions */}
        {!query && trendingMovies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Trending Now
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
              {trendingMovies.slice(0, 12).map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <MovieCard data={movie} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;