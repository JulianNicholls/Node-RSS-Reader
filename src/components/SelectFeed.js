import React from 'react';

import { useFeeds } from '../context';

const SelectFeed = () => {
  const { feeds, currentFeed, setCurrentFeed } = useFeeds();

  const setNewFeed = (e) => {
    console.log(e.target.value);

    setCurrentFeed(e.target.value);
  };

  return (
    <select
      onChange={setNewFeed}
      className="select-css"
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
