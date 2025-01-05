import { loginUser, logout, registerUser } from './auth';
import { loadProductFromCart } from './cart';
import { getProductsByPage, getProductsBySlug } from './products';

export const server = {
  // actions

  // Auth
  loginUser,
  logout,
  registerUser,

  //Products
  getProductsByPage,
  getProductsBySlug,

  //Cart
  loadProductFromCart
};
