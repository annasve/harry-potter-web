import { useState, useEffect } from 'react';

import Catalog from '../Catalog/Catalog';
import Pagination from '../Pagination/Pagination';
import Character from '../../types/Attributes';
import Searchbar from '../Searchbar/Searchbar';

interface HomeProps {
  totalPages: number;
  handlePagination: (num: number) => void;
  pageNumber: number;
  attributes: Character[];
}

export const Home: React.FC<HomeProps> = ({
  totalPages,
  handlePagination,
  pageNumber,
  attributes,
}) => {
  const [filteredCharacters, setFilteredCharacters] =
    useState<Character[]>(attributes);

  const handleSearchResult = (filtered: Character[]) => {
    setFilteredCharacters(filtered);
    //TODO handle behavior when no matches found
  };

  //For proper catalog display - load all characters when not searching
  useEffect(() => {
    setFilteredCharacters(attributes);
  }, [attributes]);

  return (
    <>
      <h1>⚡ Harry Potter characters 🌟</h1>
      <Searchbar onResult={handleSearchResult} />
      <Catalog data={filteredCharacters} />
      <Pagination
        pagination={totalPages}
        handlePagination={handlePagination}
        pageNumber={pageNumber}
      />
    </>
  );
};
export default Home;
