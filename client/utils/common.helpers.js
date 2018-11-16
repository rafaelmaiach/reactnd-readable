import sortBy from 'sort-by';
import moment from 'moment';

// Make the first letter of string uppercase
const capitalize = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

// Check if the category is the current one and add "is-active" class to highlight it
const isCategoryActive = (category, currentCategory) => category === currentCategory ? 'is-active' : '';

// https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const timestampToDate = timestamp => moment(timestamp).format('MM/DD/YYYY hh:mm');

const normalizeObjectById = postsList => postsList.reduce((a, c) => {
  a[c.id] = c; //eslint-disable-line
  return a;
}, {});

const sortData = ({ type, order }) => (data) => {
  let result = null;
  switch (order) {
    case 'decrescent': {
      result = data.sort(sortBy(`-${type}`));
      break;
    }
    case 'crescent': {
      result = data.sort(sortBy(type));
      break;
    }
    default:
      result = data.sort(sortBy(type));
      break;
  }
  return result;
};


export {
  capitalize,
  isCategoryActive,
  copyToClipboard,
  timestampToDate,
  normalizeObjectById,
  sortData,
};
