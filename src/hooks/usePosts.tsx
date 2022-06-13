import { useCallback, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

import { getPosts } from 'api/posts';
import { reduceHistoryMoves } from 'utils/reduceHistoryMoves';
import { swapItems } from 'utils';

import type { IHistoryItem } from 'hooks/useTimeTravel';
import type { IPost } from 'components/Post';

export const usePosts = (start = 0, limit = 5) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initialPosts = useRef<IPost[]>([]);

  const resetPostsWithInitial = () => {
    setPosts(initialPosts.current);
  };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPosts(start, limit);
      const postsData = data.map((post, index) => ({ ...post, origin: index }));
      setPosts(postsData);
      initialPosts.current = postsData;
    } catch (error: any) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      setError(error);
    }
    setLoading(false);
  }, [limit, start]);

  const reorderPosts = (from: number, to: number) => {
    const newPosts = swapItems(posts, from, to);
    setPosts(newPosts);
  };

  const rollbackWithHistory = (history: IHistoryItem[]) => {
    const reducedMoves = reduceHistoryMoves(history);

    if (!history.length || !reducedMoves || !reducedMoves.size) {
      resetPostsWithInitial();
      return;
    }

    let newPosts = [...initialPosts.current];

    reducedMoves.forEach((post) => {
      newPosts = swapItems(newPosts, post.origin, post.origin + post.move);
    });

    setPosts(newPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, rollbackWithHistory, reorderPosts };
};
