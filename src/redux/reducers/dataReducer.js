import { DATA } from "../types/dataType";

const initialState = {
  productData: {},
};

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA:
      for (const category in action.data) {
        action.data[category].forEach((product) => {
          product.sizes = {
            small: { price: product.price, quantity: 0 },
            medium: { price: (product.price * 0.1) + product.price, quantity: 0 },
            large: { price: (product.price * 0.2) + product.price, quantity: 0 },
          };
          product.quantity = 0;
          product.colors = ["black", "white", "pink", "red"];
        });
      }
      console.log(action.data);
      return {
        productData: { ...action.data },
      };
    default:
      return state;
  }
};

export default DataReducer;
