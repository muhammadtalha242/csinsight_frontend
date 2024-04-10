import { API_BASE_URL, type AUTOCOMPLETE_ROUTES } from '@/constants/const';
import axios, { type CancelTokenSource } from 'axios';
import { useQuery } from 'react-query';

interface AutocompleteProps {
  route: AUTOCOMPLETE_ROUTES;
  inputValue: string;
}

export const useAutocomplete = ({ route, inputValue }: AutocompleteProps) => {
  console.log('inputValue', inputValue);

  let cancelTokenSource: CancelTokenSource | null = null;

  const autocomplete = async () => {
    if (!inputValue) return [];

    // Cancel previous request if it exists

    if (cancelTokenSource) {
      cancelTokenSource.cancel('Request canceled');
    }

    // Create a new cancel token source
    cancelTokenSource = axios.CancelToken.source();

    try {
      const response = await axios.get(`${API_BASE_URL}/autocomplete/${route}?q=${inputValue}`, {
        cancelToken: cancelTokenSource.token,
      });

      return response.data.map((item: { id: string; value: string }) => ({
        key: item.id,
        value: item.value,
      }));
    } catch (error) {
      throw new Error('Network response error');
    }
  };

  const { data, isFetching } = useQuery(['routes', inputValue], autocomplete, {
    enabled: inputValue.length > 3,
  });

  return { data, isFetching };
};
