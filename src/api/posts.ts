import type { IPost } from 'components/Post';

import { POSTS_BASE_URL, POSTS_PAGINATION_KEYS } from 'utils/constants';

export const getPosts = async (start: number, limit: number) => {
  try {
    const params = new URLSearchParams();
    params.set(POSTS_PAGINATION_KEYS.PAGE, String(start));
    params.set(POSTS_PAGINATION_KEYS.LIMIT, String(limit));

    const response = await fetch(`${POSTS_BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const posts: IPost[] = await response.json();
    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
};
