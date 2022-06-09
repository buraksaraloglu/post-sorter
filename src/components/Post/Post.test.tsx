import { render, fireEvent } from '@testing-library/react';

import { Post } from '.';
import mockPost from './Post.mock';

describe('Post', () => {
  it('should render a post with a title and reorder buttons', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Post
        post={mockPost}
        shouldShowUpButton={true}
        shouldShowDownButton={true}
        onUpClick={onClick}
        onDownClick={onClick}
      />
    );

    expect(getByText(/test title/i)).toBeInTheDocument();

    const upButton = getByText(/\+/i);
    expect(upButton).toBeInTheDocument();
    fireEvent.click(upButton);
    expect(onClick).toHaveBeenCalledTimes(1);

    const downButton = getByText(/-/i);
    expect(downButton).toBeInTheDocument();
    fireEvent.click(downButton);
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
