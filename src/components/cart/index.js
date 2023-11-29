import React from "react";
import PropTypes from 'prop-types';
import Head from "../head";
import List from "../list";
import { formatNumber } from "../../utils";
import { FORMATING_OPTIONS_PRICE } from "../../lib/const";
import './style.css';

function Cart({ onClose, list, itemHandler, totalPrice }) {
  return (
    <div className='Cart'>
      <Head title='Корзина'>
        <button className='Cart-button' onClick={onClose}>Закрыть</button>
      </Head>
      <div className='Cart-list-wrapper'>
        {list.length > 0
          ? (<>
            <List list={list} isCartList={true} itemHandler={itemHandler} />
            <div className='Cart-total'>
              <strong className='Cart-total-title'>Итого</strong>
              <strong className='Cart-total-count'>
                {formatNumber(totalPrice, FORMATING_OPTIONS_PRICE)}
              </strong>
            </div>
          </>)
          : <h2 className='Cart-empty-warning'>В корзине пусто</h2>
        }
      </div>
    </div>
  )
}

Cart.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  })).isRequired,
  totalPrice: PropTypes.number,
  itemHandler: PropTypes.func,
  onClose: PropTypes.func
};


export default React.memo(Cart);
