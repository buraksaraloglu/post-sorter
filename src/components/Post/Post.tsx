interface Post {
  id: number;
  title: string;
}

interface PostProps {
  post: Post;
  shouldShowUpButton: boolean;
  shouldShowDownButton: boolean;
  onUpClick: () => void;
  onDownClick: () => void;
}

const Post = ({ post, onDownClick, onUpClick, shouldShowUpButton, shouldShowDownButton }: PostProps) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <div>
        {shouldShowUpButton && (
          <button type="button" onClick={onUpClick}>
            +
          </button>
        )}
        {shouldShowDownButton && (
          <button type="button" onClick={onDownClick}>
            -
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
