import { useState } from 'react';
import Character from '../../types/Attributes';

import { FaMagnifyingGlass } from 'react-icons/fa6';

interface SearchbarProps {
  onResult: (filtered: Character[]) => void;
}

export const Searchbar: React.FC<SearchbarProps> = ({ onResult }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const url = `https://api.potterdb.com/v1/characters?filter[name_cont]=${searchQuery}`;

    const fetchSearch = async () => {
      const response = await fetch(url);
      const res = await response.json();
      const data = res.data;

      const filteredCharactersArray: Character[] = data.map(
        (item: Character) => item || {},
      );
      onResult(filteredCharactersArray);
    };
    fetchSearch();
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={(e) => {
          e.preventDefault();
          setSearchQuery(e.target.value);
        }}
      />
      <button type="submit" className="search-button">
        <FaMagnifyingGlass className="search-icon" />
      </button>
    </form>
  );
};
export default Searchbar;
