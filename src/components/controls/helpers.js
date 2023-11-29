export const getCartTotalInfo = (list) => {
  let totalCount = 0;
  let totalPrice = 0;
  list.forEach(({ price, count }) => {
    totalCount += count;
    totalPrice += count * price;
  });
  return { totalCount, totalPrice }
}