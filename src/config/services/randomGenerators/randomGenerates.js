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

const getRandomSizes = (price) => {
  let sizes = {};

  if (Math.random() < 0.5) {
    sizes.small = price
  }

  if (Math.random() < 0.5) {
    sizes.medium = (price * 0.1) + price;
  }

  if (Math.random() < 0.5) {
    sizes.large = (price * 0.2) + price;
  }

  // If sizes is still empty, set a default value (e.g., medium)
  if (Object.keys(sizes).length === 0) {
    sizes.small = price;
  }

  return sizes;
}


export { generateRandomColors, getRandomSizes }
