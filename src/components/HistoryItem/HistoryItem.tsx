import type { IHistoryItem } from 'hooks/useTimeTravel';
import type { IPostsContext } from 'containers/Contexts/Posts';

const HistoryItem = ({
  item,
  position,
  rollback
}: {
  item: IHistoryItem;
  position: number;
  rollback: IPostsContext['rollback'];
}) => {
  const { from, move, id } = item;

  const handleClick = () => {
    rollback(position + 1);
  };

  return (
    <li className="flex flex-row gap-4 justify-between items-center py-2 space-x-4">
      {`Moved post ${id} from index ${from} to index ${from + move}`}
      <button
        onClick={handleClick}
        className="py-2 px-4 min-w-max text-sm text-white bg-green-600 hover:bg-green-700 rounded-md active:shadow-lg duration-150"
      >
        Time Travel
      </button>
    </li>
  );
};

export default HistoryItem;
