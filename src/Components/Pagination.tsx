interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="pagination">
      <button className="pagination__btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        ← Prev
      </button>
      <span className="pagination__span">{currentPage} / {totalPages}</span>
      <button className="pagination__btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next →
      </button>
    </div>
  );
}
