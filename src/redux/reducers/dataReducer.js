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
          // product.sizes = {
          //   small: product.price,
          //   medium: (product.price * 0.1) + product.price,
          //   large: (product.price * 0.2) + product.price,
          // };
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
      // console.log(action.currentName, "_____________");
      return {
        productData: { ...temp },
      };
    default:
      return state;
  }
};

export default dataReducer;
