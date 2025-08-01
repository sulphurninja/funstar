import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiEye, HiX, HiCheck, HiExclamation, HiStar } from 'react-icons/hi';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';

interface Movie {
  id?: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string[];
  duration: string;
  category: string;
  isTrending?: boolean;
}

const AdminPanel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [formData, setFormData] = useState<Movie>({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    genre: [],
    duration: '',
    category: 'movies',
    isTrending: false
  });

const categories = [
  { id: 'all', label: 'All Content' },
  { id: 'trending', label: 'Trending' },
  { id: 'movies', label: 'Movies' },
  { id: 'tv-series', label: 'TV Series' },
  { id: 'documentaries', label: 'Documentaries' },
  { id: 'anime', label: 'Anime' },
  { id: 'kids-family', label: 'Kids & Family' },
  { id: 'funstar-originals', label: 'Funstar Originals' }
];

  // Fetch movies
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      toast.error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.videoUrl || !formData.thumbnailUrl) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const url = editingMovie ? `/api/movies/${editingMovie.id}` : '/api/movies';
      const method = editingMovie ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(editingMovie ? 'Movie updated successfully' : 'Movie added successfully');
        resetForm();
        fetchMovies();
      } else {
        toast.error('Failed to save movie');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      
      if (response.ok) {
        toast.success('Movie deleted successfully');
        fetchMovies();
        setDeleteConfirm(null);
      } else {
        toast.error('Failed to delete movie');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Toggle trending status
  const toggleTrending = async (movie: Movie) => {
    try {
      const response = await fetch(`/api/movies/${movie.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...movie, isTrending: !movie.isTrending })
      });

      if (response.ok) {
        toast.success(`Movie ${movie.isTrending ? 'removed from' : 'added to'} trending`);
        fetchMovies();
      } else {
        toast.error('Failed to update trending status');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
      genre: [],
      duration: '',
      category: 'movies',
      isTrending: false
    });
    setEditingMovie(null);
    setIsModalOpen(false);
  };

  // Edit movie
  const handleEdit = (movie: Movie) => {
    setFormData(movie);
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  // Handle genre input
  const handleGenreChange = (genreString: string) => {
    const genres = genreString.split(',').map(g => g.trim()).filter(g => g);
    setFormData({ ...formData, genre: genres });
  };

  // Filter movies by category
  const filteredMovies = selectedCategory === 'all' 
    ? movies 
    : movies.filter(movie => movie.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Panel</h1>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiPlus className="text-lg" />
              Add Movie
            </motion.button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{movies.length}</div>
            <div className="text-slate-400 text-sm">Total Movies</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">{movies.filter(m => m.isTrending).length}</div>
            <div className="text-slate-400 text-sm">Trending</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{movies.filter(m => m.category === 'movies').length}</div>
            <div className="text-slate-400 text-sm">Movies</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{movies.filter(m => m.category === 'series').length}</div>
            <div className="text-slate-400 text-sm">TV Series</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {loading && !isModalOpen ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMovies.map((movie) => (
              <motion.div
                key={movie.id}
                className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-slate-700/30 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
              >
                {/* Movie Image */}
                <div className="relative aspect-video">
                  <Image
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-slate-900/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                      {categories.find(c => c.id === movie.category)?.label}
                    </span>
                  </div>

                  {/* Trending badge */}
                  {movie.isTrending && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1">
                        <HiStar className="text-xs" />
                        TRENDING
                      </span>
                    </div>
                  )}
                </div>

                {/* Movie Info */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                    {movie.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {movie.genre.map((g, index) => (
                      <span
                        key={index}
                        className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-slate-400 text-sm mb-4">
                    Duration: {movie.duration}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEdit(movie)}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HiPencil className="text-sm" />
                      Edit
                    </motion.button>
                    
                    <motion.button
                      onClick={() => toggleTrending(movie)}
                      className={`py-2 px-3 rounded-lg transition-colors ${
                        movie.isTrending 
                          ? 'bg-yellow-600 hover:bg-yellow-500 text-black' 
                          : 'bg-slate-600 hover:bg-slate-500 text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HiStar className="text-sm" />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setDeleteConfirm(movie.id!)}
                      className="bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HiTrash className="text-sm" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-900 rounded-xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <h2 className="text-xl font-semibold text-white">
                  {editingMovie ? 'Edit Movie' : 'Add New Movie'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <HiX className="text-xl" />
                </button>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Enter movie title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 h-24 resize-none"
                    placeholder="Enter movie description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    required
                  >
                    {categories.filter(c => c.id !== 'all').map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Video URL (iframe) *</label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Enter iframe URL"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Thumbnail URL *</label>
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Enter thumbnail image URL"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Genres</label>
                  <input
                    type="text"
                    value={formData.genre.join(', ')}
                    onChange={(e) => handleGenreChange(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Enter genres separated by commas (e.g., Action, Drama, Sci-Fi)"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="e.g., 120 min"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="trending"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 bg-slate-800 border-slate-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="trending" className="text-white font-medium">
                    Mark as Trending (will appear in Billboard)
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <HiCheck className="text-sm" />
                        {editingMovie ? 'Update' : 'Add'} Movie
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-900 rounded-xl border border-slate-700 p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-full">
                  <HiExclamation className="text-red-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white">Delete Movie</h3>
              </div>
              
              <p className="text-slate-400 mb-6">
                Are you sure you want to delete this movie? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;