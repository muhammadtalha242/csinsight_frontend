import { API_BASE_URL, type AUTOCOMPLETE_ROUTES } from '@/constants/const';
import axios from 'axios';
import { useQuery } from 'react-query';

interface AutocompleteProps {
  route: AUTOCOMPLETE_ROUTES;
  inputValue: string;
}

export const useAutocomplete = ({ route, inputValue }: AutocompleteProps) => {

  const autocomplete = async () => {
    if (!inputValue) return [];

    try {
      const response = await axios.get<{id: string, value: 'string'}[]>(`${API_BASE_URL}/autocomplete/${route}?q=${inputValue}`);

      return response.data.map((item: { id: string; value: string }) => ({
        label: item.id,
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
