import { DATA } from "../types/dataType";

const initialState = {
  productData: {},
};

let colors = ['FloralWhite', 'LightSkyBlue', 'DodgerBlue', 'Tomato', 'LightGray'];

const generateRandomColors = () => {
  let maxLength = Math.floor(Math.random() * 5) + 1;
  let randomColors = [];

  while (randomColors.length < maxLength) {
    let randomIndex = Math.floor(Math.random() * colors.length);
    let randomColor = colors[randomIndex];

    // Check if the color is not already in the array
    if (!randomColors.includes(randomColor)) {
      randomColors.push(randomColor);
    }
  }

  return randomColors;
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA:
      for (let category in action.data) {
        action.data[category].forEach((product) => {
          product.sizes = {
            small: product.price,
            medium: (product.price * 0.1) + product.price,
            large: (product.price * 0.2) + product.price,
          };
          product.quantity = 0;
          product.colors = generateRandomColors();
        });
      }
      return {
        productData: { ...action.data },
      };
    default:
      return state;
  }
};

export default dataReducer;
