import StoreModule from "../module";

class Pagination extends StoreModule {

  initState() {
    return {
      currentPage: 1,
    }
  }

  setPage(newPage) {
    this.setState({
      ...this.getState(),
      currentPage: newPage,
    }, `Текущая страница изменена на ${newPage}`);
  }
}

export default Pagination;
