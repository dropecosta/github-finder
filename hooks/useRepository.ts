import useSwr from 'swr'
import fetcher from '../lib/fetcher';

const useRepository = (language: string) => {

  const { data, error, isLoading } = useSwr(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`, fetcher);
  return {
    data,
    error,
    isLoading
  }
};

export default useRepository;


// const fetchRepositories = async (language) => {
//   const url = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;
//   const response = await axios.get(url);
//   return response.data.items;
// };