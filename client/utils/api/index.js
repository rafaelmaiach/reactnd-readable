import { getAllCategories } from './categories';
import { getAllPosts } from './posts';

export const getInitialData = () => Promise.all([
  getAllCategories(),
  getAllPosts(),
]).then(([categories, posts]) => ({
  categories,
  posts,
}));
