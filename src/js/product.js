import ProductData from './ProductData.mjs';
import ProductDetails from './productDetails.js';
import { getLocalStorage, getParam, setLocalStorage } from './utils.mjs';

const productId = getParam('product');
const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);

product.init();

function addProductToCart(newProduct) {
  const currentCart = getLocalStorage('so-cart') || [];
  currentCart.push(newProduct);
  setLocalStorage('so-cart', currentCart);
}

async function addToCartHandler(e) {
  const productToAdd = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(productToAdd);
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'addToCart') {
    addToCartHandler(e);
  }
});
