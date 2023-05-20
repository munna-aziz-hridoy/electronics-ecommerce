import {
  getAllCategory,
  removeCategory,
  addNewCategory,
  getParentCategory,
  getAllSubCategory,
} from "./CategoryApis";

import { loginUser, resisterUser } from "./LoginRegister";

import { getAllUser, addNewUser } from "./AllUserApis";
import { getAllProduct, newProductAdd } from "./ProductApis";

export {
  getAllCategory,
  removeCategory,
  addNewCategory,
  loginUser,
  resisterUser,
  getParentCategory as getCategory,
  getAllProduct,
  getAllUser,
  addNewUser,
  newProductAdd,
  getAllSubCategory,
};
