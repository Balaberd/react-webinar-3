import React, { useState } from "react";
import PropTypes from 'prop-types';
import { formatNumber, plural } from "../../utils";
import { FORMATING_OPTIONS_GOODS, FORMATING_OPTIONS_PRICE } from "../../lib/const";
import Modal from "../modal";
import Cart from "../cart";
import './style.css';

function Controls({ cart, itemHandler }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { totalCount, totalPrice } = cart;

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
            cart={cart}
            itemHandler={itemHandler}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.shape({
    totalCount: PropTypes.number,
    totalPrice: PropTypes.number,
    list: PropTypes.shape({
      [PropTypes.string]: PropTypes.shape({
        count: PropTypes.number,
        totalPrice: PropTypes.number,
        item: PropTypes.shape({
          code: PropTypes.number,
          price: PropTypes.string,
          title: PropTypes.string,
        }).isRequired
      })
    }).isRequired
  }).isRequired,
  itemHandler: PropTypes.func,
};

Controls.defaultProps = {
  itemHandler: () => { }
}

export default React.memo(Controls);
