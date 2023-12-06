import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginationButton({ children, isGap = false, isActive = false, onClick }) {
  const cn = bem('PaginationButton');

  isActive = isGap ? false : isActive;

  return (
    <button
      className={cn({ active: isActive, gap: isGap })}
      onClick={onClick}
      disabled={isGap || isActive}
    >
      {isGap ? "..." : children}
    </button>
  )
}

PaginationButton.propTypes = {
  children: PropTypes.number,
  isGap: PropTypes.bool,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

PaginationButton.defaultProps = {
  onClick: () => { },
}

export default memo(PaginationButton);
