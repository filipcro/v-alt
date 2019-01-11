import { fetchItems } from './items';

const fetchCurrencies = fetchItems('/currency');

export default fetchCurrencies;
