import React, { useState } from "react";
import PropTypes from 'prop-types';
import { formatNumber, plural } from "../../utils";
import { FORMATING_OPTIONS_GOODS, FORMATING_OPTIONS_PRICE } from "../../lib/const";
import { getCartTotalInfo } from "./helpers";
import Modal from "../modal";
import Cart from "../cart";
import './style.css';

function Controls({ list, itemHandler }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { totalCount, totalPrice } = getCartTotalInfo(list);

  const formatedValue = totalCount > 0
    ? `${totalCount} ${plural(totalCount, FORMATING_OPTIONS_GOODS)} / ${formatNumber(totalPrice, FORMATING_OPTIONS_PRICE)}`
    : 'пусто';

  return (
    <div className='Controls'>
      <p className='Controls-title'>
        <span>В корзине:</span>
        <strong>{formatedValue}</strong>
      </p>
      <button className='Controls-button' onClick={() => setIsModalOpen(true)}>Перейти</button>
      {isModalOpen && (
        <Modal onModalClose={() => setIsModalOpen(false)}>
          <Cart
            list={list}
            itemHandler={itemHandler}
            totalPrice={totalPrice}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  })).isRequired,
  itemHandler: PropTypes.func,
};

Controls.defaultProps = {
  itemHandler: () => { }
}

export default React.memo(Controls);
