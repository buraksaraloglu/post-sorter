import type { Post } from 'components/Post/Post';

export const generateRandomPost = (): Post => {
  return {
    id: Math.floor(Math.random() * 10_000),
    title: 'Random Post'
  };
};
