import { useFeeds } from '../context';

const SelectFeed = () => {
  const { feeds, currentFeed, setCurrentFeed } = useFeeds();

  const setNewFeed = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentFeed(e.target.value);
  };

  return (
    <select
      onChange={setNewFeed}
      className="align-self-end p-2"
      id="feed-select"
      value={currentFeed}
    >
      {feeds.map((feed) => (
        <option key={feed._id} value={feed.url}>
          {feed.name}
        </option>
      ))}

      <option value="edit">Edit...</option>
    </select>
  );
};

export default SelectFeed;
