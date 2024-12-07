import './styles.css';

interface PaginationProps {
  pagination: number;
  handlePagination: (count: number) => void;
  pageNumber: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  handlePagination,
  pageNumber,
}) => {
  //for handlePagination
  const increment = 1;
  const decrement = -1;

  //TODO L8ER create "go-to" fn for firstPage and lastPage
  //TODO L8ER create fn for btn "Load more results"
  return (
    <div className="pagination">
      <button
        className="page-number"
        disabled={pageNumber === 1}
        onClick={() => handlePagination(decrement)}
      >
        &lt;
      </button>

      <button
        className="page-number"
        disabled={pageNumber === pagination}
        onClick={() => handlePagination(increment)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
