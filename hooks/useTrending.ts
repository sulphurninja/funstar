import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const useTrending = () => {
  const { data, error, isLoading } = useSWR('/api/movies?trending=true', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  
  return {
    data,
    error,
    isLoading
  }
};

export default useTrending;