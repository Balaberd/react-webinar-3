import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemInfo({ id, description, price, edition, madeIn, category, addToBasket }) {

  const cn = bem('Item-info');

  return (
    <div className={cn()}>
      <div className={cn('description')}>
        {description}
      </div>
      <div>
        Страна производитель:
        <strong> {madeIn}</strong>
      </div>
      <div>
        Категория:
        <strong> {category}</strong>
      </div>
      <div>
        Год выпуска:
        <strong> {edition}</strong>
      </div>
      <div className={cn('price')}>
        Цена:
        <strong> {price} ₽</strong>
      </div>
      <button className={cn('button')} onClick={() => addToBasket(id)}>Добавить</button>
    </div>
  );
}

ItemInfo.propTypes = PropTypes.shape({
  id: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  edition: PropTypes.string,
  madeIn: PropTypes.string,
  category: PropTypes.string,
  addToBasket: PropTypes.func,
}).isRequired;

ItemInfo.defaultProps = {
  addToBasket: () => { },
}

export default memo(ItemInfo);
