import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

interface SearchResult {
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

const useSearch = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (searchQuery: string, searchCategory: string = 'all') => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        category: searchCategory,
        limit: '50'
      });

      const response = await fetch(`/api/search?${params}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to search. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce(performSearch, 300);

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query, category);
    } else {
      setResults([]);
      setIsLoading(false);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [query, category]);

  return {
    query,
    setQuery,
    category,
    setCategory,
    results,
    isLoading,
    error,
    performSearch
  };
};

export default useSearch;