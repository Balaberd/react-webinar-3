/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
    * Удаление продукта из корзины
    * @param item
    */
  removeFromCart(item) {
    const { code } = item;
    const { cart } = this.state;
    const { totalCount, totalPrice, list } = cart;

    // Новые значения общего количества товаров и их сумма
    const newTotalPrice = totalPrice - list[code].totalPrice;
    const newTotalCount = totalCount - list[code].count;

    // Удаление товара из корзины
    delete list[code];

    const newCart = {
      ...cart,
      totalCount: newTotalCount,
      totalPrice: newTotalPrice,
      list: { ...list }
    };

    this.setState({ ...this.state, cart: newCart });
  };

  /**
   * Добавление продукта в корзину
   * @param item
   */
  addItemToCart(item) {
    const { totalPrice, totalCount, list } = this.state.cart;
    const { code, price } = item;

    // Проверка наличия продукта в корзине
    const hasInCart = list.hasOwnProperty(code);

    const newCart = {
      // Новые значения общей суммы и количества товара в корзине
      totalPrice: totalPrice + price,
      totalCount: totalCount + 1,
      list: {
        ...list,
        [code]: {
          // Новые значения суммы и количества добавляемого товара
          count: hasInCart ? list[code].count + 1 : 1,
          totalPrice: hasInCart ? list[code].totalPrice + price : price,
          item
        }
      }
    };

    this.setState({ ...this.state, cart: newCart });
  }
}

export default Store;
