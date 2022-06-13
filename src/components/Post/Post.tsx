import { Card } from 'components/Card';

export interface IPost {
  id: number;
  title: string;
  origin: number;
}

interface PostProps {
  post: IPost;
  shouldShowUpButton: boolean;
  shouldShowDownButton: boolean;
  onUpClick: () => void;
  onDownClick: () => void;
}

const MoveButton = ({ onClick, name, children }: { onClick: () => void; name: string; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    role="button"
    type="button"
    name={name}
    className="px-2 hover:bg-white rounded-md transition-colors duration-100"
  >
    {children}
  </button>
);

const Post = ({ post, onDownClick, onUpClick, shouldShowUpButton, shouldShowDownButton }: PostProps) => {
  return (
    <Card>
      <h3 className="font-medium">{post.title}</h3>
      <div className="flex flex-col	justify-center ml-auto">
        {shouldShowUpButton && (
          <MoveButton onClick={onUpClick} name={`${post.id}-up`}>
            +
          </MoveButton>
        )}
        {shouldShowDownButton && (
          <MoveButton onClick={onDownClick} name={`${post.id}-down`}>
            -
          </MoveButton>
        )}
      </div>
    </Card>
  );
};

export default Post;
