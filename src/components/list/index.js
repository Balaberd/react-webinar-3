import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, isCartList = false, itemHandler }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item
            item={item}
            isCartList={isCartList}
            itemHandler={itemHandler}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  })).isRequired,
  isCartList: PropTypes.bool,
  itemHandler: PropTypes.func,
};

List.defaultProps = {
  isCartList: false
}

export default React.memo(List);
