import { createContext, useContext } from 'react';
import type { ReactChild } from 'react';

import { usePosts } from 'hooks/usePosts';
import { useTimeTravel } from 'hooks/useTimeTravel';

import type { IPost } from 'components/Post';
import type { IHistoryItem } from 'hooks/useTimeTravel';

export interface IPostsContext {
  posts: IPost[];
  loading: boolean;
  reorderPosts: (from: number, to: number) => void;
  history: IHistoryItem[];
  rollback: (to: number) => void;
}

const PostsContext = createContext<IPostsContext>({
  posts: [],
  loading: true,
  reorderPosts: () => {},
  history: [],
  rollback: () => {}
});

export const usePostsContext = () => useContext<IPostsContext>(PostsContext);

const PostsProvider = ({ children }: { children: ReactChild | ReactChild[] }) => {
  const { posts, loading, reorderPosts, rollbackWithHistory } = usePosts();

  const { add, history, rollback } = useTimeTravel();

  const reorderPostsWithHistory = (from: number, to: number) => {
    const item = posts[from];
    reorderPosts(from, to);
    add({ id: item.id, origin: item.origin, from, move: to - from });
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        reorderPosts: reorderPostsWithHistory,
        history,
        rollback: (to: number) => {
          const newHistory = rollback(to);
          rollbackWithHistory(newHistory);
        }
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
