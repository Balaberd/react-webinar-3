import StoreModule from "../module";

class Pagination extends StoreModule {

  initState() {
    return {
      page: 1,
    }
  }

  setPage(newPage) {
    this.setState({
      ...this.getState(),
      page: newPage,
    }, `Текущая страница изменена на ${newPage}`);
  }
}

export default Pagination;
