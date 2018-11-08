// Make the first letter of string uppercase
const capitalize = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

// Check if the category is the current one and add "is-active" class to highlight it
const isCategoryActive = (category, currentCategory) => category === currentCategory ? 'is-active' : '';

export {
  capitalize,
  isCategoryActive,
};
