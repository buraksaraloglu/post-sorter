import { usePostsContext } from 'containers/Contexts/Posts';
import { Section } from 'components/Section';
import { HistoryItem } from 'components/HistoryItem';

const HistoryContainer = () => {
  const { history, rollback } = usePostsContext();

  return (
    <Section>
      <h2 className="mb-4 font-bold">List of actions committed</h2>
      <ol role="list" className="divide-y divide-gray-200">
        {history.length ? (
          history.map((item, index) => (
            // TODO: Find another way to create key
            <HistoryItem key={index} item={item} position={index} rollback={rollback} />
          ))
        ) : (
          <p className="text-sm text-gray-500">No actions committed yet</p>
        )}
      </ol>
    </Section>
  );
};

export default HistoryContainer;
