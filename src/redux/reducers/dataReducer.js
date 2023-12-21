import { generateRandomColors, getRandomSizes } from "../../config/services/randomGenerators/randomGenerates";
import { DATA, MANUALLYDATA } from "../types/dataType";

const initialState = {
  productData: {},
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA:
      for (let category in action.data) {
        action.data[category].forEach((product) => {
          product.sizes = getRandomSizes(product.price)
          product.quantity = 0;
          product.colors = generateRandomColors();
        });
      }
      return {
        productData: { ...action.data },
      };
    case MANUALLYDATA:
      let temp = {
        ...action.data,
        [action.currentName]: [...action.currentData]
      }
      return {
        productData: { ...temp },
      };
    default:
      return state;
  }
};

export default dataReducer;
