import { Section } from 'components/Section';
import { Post } from 'components/Post';
import { usePostsContext } from 'containers/Contexts/Posts';

const Posts = () => {
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
    <Section>
      <h1 className="mb-4 font-bold">Sortable Posts List</h1>
      {loading ? <div>Loading...</div> : renderPosts()}
    </Section>
  );
};

export default Posts;
