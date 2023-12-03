import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const { list, cart } = store.getState();

  const callbacks = {
    onAddItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, [store]),

    onRemoveFromCard: useCallback((item) => {
      store.removeFromCart(item);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls cart={cart} itemHandler={callbacks.onRemoveFromCard} />
      <List list={list} itemHandler={callbacks.onAddItemToCart} />
    </PageLayout>
  );
}

export default App;
