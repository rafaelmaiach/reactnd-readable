import sortBy from 'sort-by';

const sortPosts = ({ type, order }) => (data) => {
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

  console.log('result', result);
  return result;
};

export {
  sortPosts,
};
