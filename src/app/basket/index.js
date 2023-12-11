import { memo, useCallback, useEffect, useRef, useState } from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useLocation } from 'react-router-dom';

function Basket() {
  const store = useStore();
  const location = useLocation()
  const isFirstRender = useRef(true)

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
    } else {
      callbacks.closeModal()
    }
  }, [location])

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} />
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title='Корзина' onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
