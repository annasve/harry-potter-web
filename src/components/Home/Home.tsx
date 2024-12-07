import Catalog from '../Catalog/Catalog';
import Pagination from '../Pagination/Pagination';

import Character from '../../types/Attributes';
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
  return (
    <>
      <h1>⚡ Harry Potter characters 🌟</h1>

      <Catalog data={attributes} />

      <Pagination
        pagination={totalPages}
        handlePagination={handlePagination}
        pageNumber={pageNumber}
      />
    </>
  );
};
export default Home;
