import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import PaginationButton from "../pagination-button";

const createPageNumbers = (currentPage, lastPage) => {
  const list = [];
  for (let i = 1; i <= lastPage; i += 1) {
    if (i === 1
      || Math.abs(i - currentPage) === 1
      || i === lastPage
      || i === currentPage
    ) {
      list.push(i);
    } else if (list[list.length - 1] !== null) {
      list.push(null);
    }
  }
  return list;
}

function Pagination({ currentPage, lastPage, onChangeCurrentPage }) {
  const pagesList = createPageNumbers(currentPage, lastPage);
  return (
    <div className='Pagination'>
      {pagesList.map((page, ind) => (
        <PaginationButton
          key={ind}
          isActive={page === currentPage}
          isGap={page === null}
          onClick={() => onChangeCurrentPage(page)}
        >{page}</PaginationButton>
      ))}
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
  onChangeCurrentPage: PropTypes.func
};

Pagination.defaultProps = {
  onChangeCurrentPage: () => { },
}

export default memo(Pagination);
