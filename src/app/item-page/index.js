import { memo, useCallback, useEffect, useState } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { useLocation, useParams } from 'react-router';
import ItemInfo from '../../components/item-info';

const initState = {
  title: null,
  description: null,
  price: null,
  edition: null,
  madeIn: null,
  category: null,
}

function ItemPage() {
  const [item, setItem] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const response = fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    response.then(res => res.json()).then(data => {
      const { title, description, edition, category, madeIn, price } = data.result;
      setItem({ title, description, edition, category: category.title, madeIn: madeIn.title, price })
    })
  }, [id])

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      {item && <Head title={item.title} />}
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />
      {item && <ItemInfo {...item} id={id} addToBasket={callbacks.addToBasket} />}
    </PageLayout>

  );
}

export default memo(ItemPage);
