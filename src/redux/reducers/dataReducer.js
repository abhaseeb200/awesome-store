import {
  generateRandomColors,
  getRandomSizes,
} from "../../config/services/randomGenerators/randomGenerates";
import { DATA } from "../types/dataType";

const initialState = {
  productData: {},
  skipData: 0,
  totalData:0,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA:
      for (let category in action.data) {
        action.data[category].forEach((product) => {
          product.sizes = getRandomSizes(product.price);
          product.quantity = 0;
          product.colors = generateRandomColors();
        });
      }
      return {
        productData: { ...action.data },
        skipData: action.skip + 10,
        totalData: action.total
      };
    default:
      return state;
  }
};

export default dataReducer;
