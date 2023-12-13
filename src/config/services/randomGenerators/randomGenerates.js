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

export { generateRandomColors }
