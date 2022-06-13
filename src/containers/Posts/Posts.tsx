import { ErrorBoundary } from 'react-error-boundary';

import { ErrorMessage } from 'components/ErrorMessage';
import { Section } from 'components/Section';
import { Post } from 'components/Post';
import { usePostsContext } from 'containers/Contexts/Posts';

const PostsContainer = () => {
  const { posts, loading, reorderPosts } = usePostsContext();

  const renderPosts = () =>
    posts.length ? (
      posts.map((post, index) => {
        return (
          <Post
            key={post.id}
            post={post}
            shouldShowUpButton={index !== 0 && index <= posts.length - 1}
            onDownClick={() => reorderPosts(index, index + 1)}
            onUpClick={() => reorderPosts(index, index - 1)}
            shouldShowDownButton={index !== posts.length - 1 && index >= 0}
          />
        );
      })
    ) : (
      <p className="text-sm text-gray-500">No posts found</p>
    );

  return (
    <ErrorBoundary FallbackComponent={ErrorMessage}>{loading ? <div>Loading...</div> : renderPosts()}</ErrorBoundary>
  );
};

const PostsSection = () => {
  return (
    <Section>
      <h1 className="mb-4 font-bold">Sortable Posts List</h1>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <PostsContainer />
      </ErrorBoundary>
    </Section>
  );
};

export default PostsSection;
