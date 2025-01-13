import { loginUser, logout, registerUser } from './auth';
import { loadProductFromCart } from './cart';
import { createUpdateProduct, deleteImage, getProductsByPage, getProductsBySlug } from './products';

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
  loadProductFromCart,

  //Admin
  createUpdateProduct,

  //Images
  deleteImage
};
