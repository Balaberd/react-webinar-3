import React from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../../utils";
import { FORMATING_OPTIONS_PRICE } from "../../lib/const";
import './style.css';

function Item({ isCartList, item, itemHandler }) {
  const { code, title, price, count } = item;

  const formatedPrice = formatNumber(price, FORMATING_OPTIONS_PRICE);

  return (
    <div className={'Item'}>
      <div className='Item-code'>{code}</div>
      <div className='Item-title'>{title}</div>
      <div className='Item-price'>{formatedPrice}</div>
      {isCartList && <div className='Item-count'>{`${count} шт`}</div>}
      <button
        className='Item-action'
        onClick={() => itemHandler(code)}>{`${isCartList ? 'Удалить' : 'Добавить'}`}
      </button>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  itemHandler: PropTypes.func,
};

Item.defaultProps = {
  itemHandler: () => {
  },
}

export default React.memo(Item);
