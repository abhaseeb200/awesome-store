import { DATA } from "../types/dataType";

const initialState = {
  productData: {},
};

let colors = ['white', 'green', 'yellow', 'red', 'gray'];

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

// function generateRandomSizes(productPrice) {
//   const randomSizes = {};

//   while (Object.keys(randomSizes).length === 0) {
//     if (Math.random() < 0.5) {
//       randomSizes.small = productPrice;
//     }

//     if (Math.random() < 0.5) {
//       randomSizes.medium = (productPrice * 0.1) + productPrice;
//     }

//     if (Math.random() < 0.5) {
//       randomSizes.large = (productPrice * 0.2) + productPrice;
//     }
//   }

//   return randomSizes;
// }

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA:
      for (const category in action.data) {
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
      console.log(action.data);
      return {
        productData: { ...action.data },
      };
    default:
      return state;
  }
};

export default DataReducer;