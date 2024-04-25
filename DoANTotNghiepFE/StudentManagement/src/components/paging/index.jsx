import React, { useState } from 'react';
import './style.scss';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [page, setPage] = useState(currentPage);

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
    onPageChange(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 5) {
      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    if (currentPage !== 1) {
      buttons.push(
        <button key="prev" onClick={() => handleClick(currentPage - 1)}>
          Prev
        </button>
      );
    }

    if (startPage !== 1) {
      buttons.push(
        <button key={1} onClick={() => handleClick(1)}>
          1
        </button>
      );
      if(startPage > 2) {
        buttons.push(<span key="dots">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={i === page ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    if (endPage !== totalPages) {
      if(endPage < totalPages - 1) {
        buttons.push(<span key="dots">...</span>);
      }
      buttons.push(
        <button key={totalPages} onClick={() => handleClick(totalPages)}>
          {totalPages}
        </button>
      );
    }

    if (currentPage !== totalPages) {
      buttons.push(
        <button key="next" onClick={() => handleClick(currentPage + 1)}>
          Next
        </button>
      );
    }

    return buttons;
  };

  return <div className="pagination">{renderPaginationButtons()}</div>;
};

export default Pagination;