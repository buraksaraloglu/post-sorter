import type { IPost } from 'components/Post/Post';

export const generateRandomPost = (): IPost => {
  return {
    id: Math.floor(Math.random() * 10_000),
    title: 'Random Post',
    origin: 0
  };
};
