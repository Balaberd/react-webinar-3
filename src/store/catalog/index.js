import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      pageLimit: 10,
      lastPage: 1,
      isLoading: false,
    }
  }

  async firstLoad() {
    const response = await fetch(`api/v1/articles?limit=10&skip=0&fields=items(_id, title, price),count`);
    const json = await response.json();
    const { items, count } = json.result;
    console.log(this.getState())
    this.setState({
      ...this.getState(),
      list: items,
      lastPage: Math.ceil(count / this.getState().pageLimit),
    }, 'Загружены товары из АПИ');
  }

  async loadByPage(page) {
    const pageLimit = this.getState().pageLimit;
    const response = await fetch(`api/v1/articles?limit=${pageLimit}&skip=${(page - 1) * pageLimit}`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: json.result.items,
      currentPage: page
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
