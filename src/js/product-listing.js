import ProductData from './ProductData.mjs';
import ProductList from './ProductList.js';
import { getParam } from './utils.mjs';

// pega categoria da URL
const category = getParam('category');

// data source
const dataSource = new ProductData();

// pega elemento
const listElement = document.querySelector('.product-list');

// cria lista
const myList = new ProductList(category, dataSource, listElement);

// inicia
myList.init();
